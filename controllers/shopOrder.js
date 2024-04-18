const db = require('../models')
const Order = db.Order
const Cart = db.Cart
const OrderItem = db.OrderItem
const Product = db.Product
const Payment = db.Payment

const { getData, decryptData } = require('../utils/handleMpgData')
const { sendMail, orderMail, payMail } = require('../utils/sendMail')

const orderController = {
  getOrders: async (req, res, next) => {
    try {
      const ordersHavingProducts = await Order.findAll({
        raw: true,
        nest: true,
        where: { UserId: req.user.id },
        include: 'orderProducts'
      })

      const orders = await Order.findAll({
        raw: true,
        nest: true,
        where: { UserId: req.user.id }
      })

      // 以 orders中的 order 去創建一個空陣列 
      orders.forEach(order => {
        order.orderProducts = []
      })

      ordersHavingProducts.forEach(product => {
        const index = orders.findIndex(order => order.id === product.id)
        if (index === -1) return
        orders[index].orderProducts.push(product.orderProducts)
      })

      return res.render('map/shop/accounts', { orders })
    } catch (e) {
      console.log(e)
      return next(e)
    }
  },
  getOrder: async (req, res, next) => {
    try {

      const order = await Order.findByPk(req.params.id, {
        include: 'orderProducts'
      })
      return res.render('map/shop/confirmation', { order: order.toJSON() })
      if (order.toJSON().payment_status === '0') {
        const tradeData = getData(order.amount, 'SpotsMap-精選商品', req.user.email)
        // save MerchantOrderNo to sn
        await order.update({
          sn: tradeData.MerchantOrderNo.toString()
        })
        return res.render('order', { order: order.toJSON(), tradeData })
      } else {
        const paidOrder = true
        return res.render('order', { order: order.toJSON(), paidOrder })
      }
    } catch (e) {
      console.log(e)
    }
  },
  fillOrderData: async (req, res, next) => {
    try {
      const cart = await Cart.findOne({
        where: { UserId: req.user.id },
        include: 'cartProducts'
      })
      const email = req.user.email

      if (!cart || !cart.cartProducts.length) {
        req.flash('warning_msg', '購物車空空的唷!')
        return res.redirect('/skateboard.map.spot/cart')
      }

      const cartId = cart.id
      // a是reduce的累加器（初始值為零），b代表每個 d.price * d.CartItem.quantity
      const amount = cart.cartProducts.length > 0 ? cart.cartProducts.map(d => d.price * d.CartItem.quantity).reduce((a, b) => a + b) : 0
      return res.render('map/shop/checkout', { cart, cartId, amount, email })
    } catch (e) {
      console.log(e)
    }
  },
  postOrder: async (req, res, next) => {
    try {
      // check all products have inventory for迴圈
      const cart = await Cart.findByPk(req.body.cartId, {
        include: 'cartProducts'
      })
      for (const product of cart.cartProducts) {
        if (product.inventory < product.CartItem.quantity) {
          req.flash('warning_msg', `商品Id:${product.id}剩下${product.inventory}件，請重新選擇數量!`)
          return res.redirect('/cart')
        }
      }
      // update inventory data 
      //  Map() 是一個key-value pair  (每個product.id, 對應一個product.CartItem.quantity)
      const productsMap = new Map()
      cart.cartProducts.forEach(product => {
        productsMap.set(product.id, product.CartItem.quantity)
      })
      for (const [id, quantity] of productsMap) {
        const product = await Product.findByPk(id)
        await product.update({
          inventory: product.inventory -= quantity
        })
      }
      // create order (cart -> order)
      const order = await Order.create({
        UserId: req.user.id,
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        amount: req.body.amount,
        shipping_status: req.body.shipping_status,
        payment_status: req.body.payment_status
      })
      // create orderItem (cartItem -> orderItem)
      const items = Array.from({ length: cart.cartProducts.length }).map((_, i) => (
        OrderItem.create({
          OrderId: order.id,
          ProductId: cart.cartProducts[i].id,
          price: cart.cartProducts[i].price,
          quantity: cart.cartProducts[i].CartItem.quantity
        })
      ))
      // 等待item全部執行完成
      Promise.all(items)

      // send mail
      const email = req.user.email
      const subject = `[SpotsMap 滑板地圖]謝謝你的訂單！ #${order.id}`
      const status = '準備出貨中'
      const msg = '商品到達指定門市後會收到到貨簡訊，請檢查是否有開啟阻擋廣告簡訊功能、手機簡訊容量已滿......等狀況，以免超過取貨時間! 出貨後可在訂單頁面查詢取貨編號，感謝您!'
      sendMail(email, subject, orderMail(order, status, msg))
      // clear cart & cartItem
      await cart.destroy()
      // clear cartId in session
      req.session.cartId = ''
      return res.status(201).redirect(`/skateboard.map.spot/order/${order.id}`)
    } catch (e) {
      console.log(e)
    }
  },
  cancelOrder: async (req, res, next) => {
    try {
      const order = await Order.findByPk(req.params.id)
      await order.update({
        shipping_status: '-1'
      })
      req.flash('danger_msg', `訂單編號${order.id} 已取消!`)
      return res.status(200).redirect('back')
    } catch (e) {
      console.log(e)
      return next(e)
    }
  },
  newebpayCallback: async (req, res, next) => {
    try {
      // 回傳的值有 
      const data = JSON.parse(decryptData(req.body.TradeInfo))
      console.log('***data***', data)
      // find order
      const order = await Order.findOne({ where: { sn: data.Result.MerchantOrderNo } })
      // create payment data
      await Payment.create({
        OrderId: order.id,
        payment_method: data.Result.PaymentMethod ? data.Result.PaymentMethod : data.Result.PaymentType,
        isSuccess: data.Status === 'SUCCESS' ? true : false,
        failure_message: data.Message,
        payTime: data.Result.PayTime
      })
      // flash msg
      if (data.Status === 'SUCCESS') {
        // update payment_status
        await order.update({ payment_status: 1 })
        // send mail
        const email = req.user.email
        const subject = `[TEST]卡羅購物 訂單編號:${order.id} 付款成功!`
        const status = '未出貨 / 已付款'
        const msg = '近期內會安排出貨 再麻煩注意電子郵件!'
        sendMail(email, subject, payMail(order, status, msg))
        // flash message
        req.flash('success_msg', `訂單編號:${order.id} 付款成功!`)
      } else {
        req.flash('warning_msg', `訂單編號:${order.id} 付款失敗!  [說明] ${data.Message}`)
      }
      return res.status(200).redirect(`/order/${order.id}`)
    } catch (e) {
      console.log(e)
      return next(e)
    }
  }
}

module.exports = orderController
