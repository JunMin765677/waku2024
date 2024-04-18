const db = require('../models')
const Cart = db.Cart
const CartItem = db.CartItem
const Product = db.Product

const cartController = {
  getCart: async (req, res, next) => {
    try {
      if (req.user) {
        const cart = await Cart.findOne({
          where: { UserId: req.user.id },
          include: 'cartProducts'
        })
        if (!cart) {
          return res.render('map/shop/cart')
        }
        const totalPrice = cart.cartProducts.length > 0 ? cart.cartProducts.map(d => d.price * d.CartItem.quantity).reduce((a, b) => a + b) : 0
        return res.render('map/shop/cart', { cart: cart.toJSON(), totalPrice })
      } else {
        req.flash('warning_msg', '請先登入~')
        return res.redirect('/skateboard.map.spot/users/login')
      }
    } catch (e) {
      console.log(e)
      return next(e)
    }
  },
  postCart: async (req, res, next) => { 
    try {
      // check product has inventory
      const quantity = req.body.quantity || 1
      
      const addProduct = await Product.findByPk(req.body.productId)
      if (addProduct.inventory === 0) {
        req.flash('warning_msg', `商品Id:${req.body.productId} 已經沒有庫存了!`)
        return res.redirect('back')
      }

      // find cart or create 
      // 已登入時用user.id去找,未登入時用cartID去找
      let cart = {}
      if (req.user) {
        const [userCart] = await Cart.findOrCreate({
          where: {
            UserId: req.user.id || 0
          }
        })
        cart = userCart
      } else {
        // [userCart] = userCart[0]
        const [userCart] = await Cart.findOrCreate({
          where: {
            id: req.session.cartId || 0
          },
          defaults: {
            UserId: 0
          }
        })
        cart = userCart
      }

      // find items in the cart or not
      // created 回傳true or false
      const [product, created] = await CartItem.findOrCreate({
        where: {
          CartId: cart.id,
          ProductId: req.body.productId
        },
        defaults: {
          quantity: quantity
        }
      })
      if (!created) {
        // check product quantity+1 > inventory or not
        if (product.quantity + 1 > addProduct.inventory) {
          req.flash('warning_msg', `商品Id:${req.body.productId} 庫存剩下${addProduct.inventory}件!`)
          return res.redirect('back')
        }
        product.quantity += 1
      }
      // 儲存 product.quantity += 1
      await product.save()
 
      // save cartId in session
      req.session.cartId = cart.id
      req.flash('successAdd_msg', `已加入購物車！`)
      return res.status(200).redirect('back')
    } catch (e) {
      console.log(e)
      return res.status(500).json({ success: false, message: '加入購物車時出錯！' });
      return next(e)
    }
  },
  // postCart: async (req, res, next) => {
  //   try {
  //     console.log('ajax is here');
  //     const quantity = req.body.quantity || 1;
  
  //     const addProduct = await Product.findByPk(req.body.productId);
  
  //     if (addProduct.inventory === 0) {
  //       return res.status(400).json({ error: `商品Id:${req.body.productId} 已經沒有庫存了!` });
  //     }
  
  //     let cart = {};
  
  //     if (req.user) {
  //       const [userCart] = await Cart.findOrCreate({
  //         where: { UserId: req.user.id || 0 },
  //       });
  //       cart = userCart;
  //     } else {
  //       const [userCart] = await Cart.findOrCreate({
  //         where: { id: req.session.cartId || 0 },
  //         defaults: { UserId: 0 },
  //       });
  //       cart = userCart;
  //     }
  
  //     const [product, created] = await CartItem.findOrCreate({
  //       where: {
  //         CartId: cart.id,
  //         ProductId: req.body.productId,
  //       },
  //       defaults: {
  //         quantity: quantity,
  //       },
  //     });
  
  //     if (!created) {
  //       if (product.quantity + 1 > addProduct.inventory) {
  //         return res.status(400).json({ error: `商品Id:${req.body.productId} 庫存剩下${addProduct.inventory}件!` });
  //       }
  //       product.quantity += 1;
  //     }
  
  //     await product.save();
  //     req.session.cartId = cart.id;
  
  //     return res.status(200).json({ success: true, message: '商品已成功添加到購物車' });
  //   } catch (e) {
  //     console.error(e);
  //     return res.status(500).json({ error: '伺服器錯誤' });
  //   }
  // },
  
  addCartItem: async (req, res, next) => {
    try {
      // find cart
      const product = await CartItem.findByPk(req.params.productId)
      // find product inventory
      const addProduct = await Product.findByPk(product.ProductId)
      // check product quantity+1 > inventory or not
      if (product.quantity + 1 > addProduct.inventory) {
        req.flash('warning_msg', `商品Id:${product.ProductId} 庫存剩下${addProduct.inventory}件!`)
        return res.redirect('back')
      }
      await product.update({
        quantity: product.quantity + 1
      })
      req.flash('addCartItem_msg', `幸福+1 好運+1`)
      return res.status(200).redirect('back')
    } catch (e) {
      console.log(e)
      return next(e)
    }
  },
  subCartItem: async (req, res, next) => {
    try {
      // find cart
      const product = await CartItem.findByPk(req.params.productId)
      await product.update({
        quantity: product.quantity - 1 ? product.quantity - 1 : 1
      })
      req.flash('subCartItem_msg', `幸福-1`)
      return res.status(200).redirect('back')
    } catch (e) {
      console.log(e)
      return next(e)
    }
  },
  deleteCartItem: async (req, res, next) => {
    try {
      // find cart
      const product = await CartItem.findByPk(req.params.productId)
      await product.destroy()
      req.flash('successDel_msg', '下一個會更好Q_Q')
      return res.status(200).redirect('back')
    } catch (e) {
      console.log(e)
      return next(e)
    }
  },

  cartData: async (req, res, next) => {
    try {
      let cart;
      if (req.user) {
        // 如果用户已登录,获取用户的购物车
        cart = await Cart.findOne({
          where: { UserId: req.user.id },
          include: 'cartProducts'
        });
      } else {
        // 如果用户未登录,获取会话的购物车
        if (req.session.cartId) {
          cart = await Cart.findByPk(req.session.cartId, {
            include: 'cartProducts'
          });
        }
      }

      if (cart) {
        const cartItems = cart.cartProducts.map(item => ({
          id: item.CartItem.id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.CartItem.quantity
        }));

        const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

        res.json({ cartItems, totalPrice });
      } else {
        res.json({ cartItems: [], totalPrice: 0 });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
}


module.exports = cartController
