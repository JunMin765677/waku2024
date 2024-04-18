const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash');
// GET POST PUT DELETE
const methodOverride = require('method-override')
const cors = require('cors')

const cache = require("./utils/cache");

// 使用環境變數
const dotenv = require('dotenv');
dotenv.config();

const config = require('./config');

if (config.NODE_ENV === 'production') {
  // 對於生產環境,運行以下程式碼
  app.disable('x-powered-by'); // 隱藏 X-Powered-By 標頭
}

const app = express()
const port = config.PORT || 8080

// set cors 可以接受來自不同網域的請求
app.use(cors())

// set trust proxy Express  使EXPRESS不會誤用反向代理伺服器的 IP 地址
app.set('trust proxy', true)

// 設定 Referrer-Policy 標頭為 'strict-origin-when-cross-origin'
app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

app.set('view engine', 'ejs')
const helpers = require('./config/hbs-helpers')
app.use(express.static('public'));

 
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))
app.use(express.json());

// set methodOverride 將 POST 請求覆蓋為 PUT 或 DELETE 請求
app.use(methodOverride('_method'))
 
// set session
app.use(session({
  secret: config.SESSION_SECRET,
  // 只有在 session 數據發生更改時才進行保存
  resave: false,
  // 確保每個訪問者都有一個獨立的 session
  saveUninitialized: true,
  // 100 DAYS
  cookie: { maxAge: 100 * 60 * 60 * 24 }
}))

// set connect-flash req.flash()
app.use(flash())


// 使用 node-cache 放置 token 在 req.headers
app.use((req, res, next) => {
  const value = cache.get("token");
  if (value) {
    req.headers.authorization = `Bearer ${value}`;
  }
  next();
})



// flash message 路由處理中呼叫req.flash 就會被賦值到res.locals
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.danger_msg = req.flash('danger_msg')
  res.locals.successAdd_msg = req.flash('successAdd_msg')
  res.locals.successDel_msg = req.flash('successDel_msg')
  res.locals.addCartItem_msg = req.flash('addCartItem_msg')
  res.locals.subCartItem_msg = req.flash('subCartItem_msg')
  return next()
})



// require routes
require('./routes')(app)

 
// error handling middleware
app.use((err, req, res, next) => {
  if (err) {
    res.status(500)
    console.log('500 error: ', err)
    // render 到 views/error.hbs
    return res.render('map/partials/error', { err })
  }
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})