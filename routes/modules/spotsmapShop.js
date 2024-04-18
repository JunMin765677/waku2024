const express = require('express');
const spotsShop = express.Router();
const mapController = require('../../controllers/map')
const session = require('express-session')
// 使用環境變數
const dotenv = require('dotenv');
dotenv.config();


// SpotsMap Shop 
const { authenticated } = require('../../middleware/auth')
const checkToken = require('../../middleware/checkToken')

const productController = require('../../controllers/shopProduct')
const cartController = require('../../controllers/shopCart')
const orderController = require('../../controllers/shopOrder')

// product ===============
spotsShop.get('/products', (req, res, next) => {
    checkToken(req, res, next, productController.getProducts)
  }, authenticated, productController.getProducts)
spotsShop.get('/product/:id', (req, res, next) => {
  checkToken(req, res, next, productController.getProduct)
}, authenticated, productController.getProduct)
spotsShop.get('/policy', productController.policyPage)


  
// Cart =======================
spotsShop.get('/cart', (req, res, next) => {
    checkToken(req, res, next, cartController.getCart)
  }, authenticated, cartController.getCart)
spotsShop.post('/cart', (req, res, next) => {
    checkToken(req, res, next, cartController.postCart)
}, authenticated, cartController.postCart)
  

// CartItem =======================
spotsShop.post('/cartItem/:productId/add', (req, res, next) => {
  checkToken(req, res, next, cartController.addCartItem)
}, authenticated, cartController.addCartItem)

spotsShop.post('/cartItem/:productId/sub', (req, res, next) => {
  checkToken(req, res, next, cartController.subCartItem)
}, authenticated, cartController.subCartItem)

spotsShop.delete('/cartItem/:productId', (req, res, next) => {
  checkToken(req, res, next, cartController.deleteCartItem)
}, authenticated, cartController.deleteCartItem)

spotsShop.get('/cartData', (req, res, next) => {
  checkToken(req, res, next, cartController.cartData)
}, authenticated, cartController.cartData)



// orders =======================
spotsShop.get('/order', authenticated, orderController.getOrders) // user get all order 
spotsShop.get('/order/data', authenticated, orderController.fillOrderData) // step1 送出
spotsShop.post('/order/data', authenticated, orderController.postOrder) // step2 送出
spotsShop.post('/order/newebpay/callback', authenticated, orderController.newebpayCallback)
spotsShop.get('/order/:id', authenticated, orderController.getOrder)
spotsShop.post('/order/:id/cancel', authenticated, orderController.cancelOrder)

module.exports = spotsShop; 