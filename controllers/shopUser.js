const db = require('../models')
const User = db.User
 
const config = require('../config');

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const cache = require("../utils/cache");

const { sendMail, registerMail } = require('../utils/sendMail')

const userController = {
  getLoginPage: (req, res, next) => {
    // 辨認用戶為使用者or管理者  
    const front = true
    const email = req.session.email
    return res.render('map/shop/login', { front, email })
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ where: { email } })
      // 更新session中的使用者email
      req.session.email = email
      if (!user) {
        req.flash('warning_msg', 'Email incorrect!')
        return res.status(401).redirect('/skateboard.map.spot/users/login')
      }
      if (user.role !== 'user') {
        req.flash('danger_msg', 'No authority!')
        return res.status(403).redirect('/skateboard.map.spot/users/login')
      }
      if (!bcrypt.compareSync(password, user.password)) {
        req.flash('warning_msg', 'Password incorrect!')
        return res.status(401).redirect('/skateboard.map.spot/users/login')
      }
      
      // token  建立token之後，再存入memccached server中。
      const payload = { id: user.id }   // 資料主體（payload）
      const expiresIn = { expiresIn: '10h' }  // 有效期為10小時
      const token = jwt.sign(payload, config.JWT_SECRET, expiresIn)  // 簽署（sign）JWT，並生成一個令牌（token）。config.JWT_SECRET 是用於簽署JWT的私密金鑰。
      
      // node-cache
      const lifetime = 60 * 60 * 10 // seconds
      cache.set("token", token, lifetime);
      console.log('Token set in cache: ', token);

      req.flash('success_msg', 'Login Success!')
      return res.status(200).redirect('/skateboard.map.spot/products')
    } catch (e) {
      console.log(e)
      return next(e)
    }
  },
  logout: async (req, res, next) => {
    try {
      // 使用 await 等待 req.logout 完成
      await new Promise((resolve, reject) => {
        req.logout(function (err) {
          if (err) {
            console.log(err);
            return reject(err);
          }
          resolve();
        });
      });
  
      // 清除 session 中的資訊
      req.session.email = '';
      req.session.cartId = '';
  
      // 使用 await 等待 cache.del 完成
      await new Promise((resolve, reject) => {
        cache.del('token', (cacheErr) => {
          if (cacheErr) {
            console.log(cacheErr);
            return reject(cacheErr);
          }
          resolve();
        });
      });
  
      // 添加成功消息
      req.flash('success_msg', 'Logout Success!');
  
      // 重定向到登入頁面
      return res.status(200).redirect('/skateboard.map.spot/users/login');
    } catch (err) {
      // 处理任何错误
      return next(err);
    }
  },
  getRegisterPage: (req, res) => {
    const email = req.session.email
    return res.render('map/shop/register', { email })
  },
  register: async (req, res, next) => {
    try {
      const { email, captcha, password, checkPassword } = req.body
      if (password !== checkPassword) {
        req.flash('warning_msg', 'Password & CheckPassword不相符!')
        return res.status(400).redirect('back')
      }
      if (req.session.captcha !== captcha) {
        req.flash('warning_msg', '驗證碼錯誤!')
        return res.status(400).redirect('back')
      }
      const user = await User.findOne({ where: { email } })
      if (user) {
        req.flash('warning_msg', '這個Email被註冊過了!')
        return res.status(400).redirect('back')
      }
      // create user
      await User.create({
        email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
        role: 'user'
      })
      req.session.captcha = ''
      req.flash('success_msg', 'Register Success!')
      return res.status(201).redirect('/skateboard.map.spot/users/login')
    } catch (e) {
      console.log(e)
      return next(e)
    }
  },
  sendCaptcha: (req, res) => {
    // send mail
    const email = req.body.email
    let captcha = ''
    // 生成6個0~9的隨機數字
    for (let i = 0; i < 6; i++) {
      captcha += Math.floor(Math.random() * 10)
    }  
    const subject = `[SpotsMap] 會員註冊驗證碼: ${captcha}`
    sendMail(email, subject, registerMail(captcha))
    // session store email & captcha
    req.session.email = email
    req.session.captcha = captcha
    req.flash('success_msg', `驗證碼已發送至您的信箱`)
    return res.redirect('/skateboard.map.spot/users/register')
  },
  googleLogin: (req, res) => {
    const payload = { id: req.user[0].id }
    const expiresIn = { expiresIn: '10h' }
    const token = jwt.sign(payload, config.JWT_SECRET, expiresIn)
    // req.session.token = token
    // node-cache
    const lifetime = 60 * 60 * 10 // seconds
    cache.set("token", token, lifetime);

    req.flash('success_msg', 'Google登入成功!')
    return res.redirect('/skateboard.map.spot/products')
  }
}

module.exports = userController
