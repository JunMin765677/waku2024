// function checkToken (req, res, next, controller) {
//   if (req.session.token) {
//     return next()
//   } else {
//     controller(req, res, next)
//   }
// }

const cache = require("../utils/cache");

function checkToken(req, res, next, controller) {
  const value = cache.get("token");
  
  if (value) {
    console.log('---value---', value);
    return next()
  } else {
    // 如果没有找到 token，执行其他逻辑
    // 注意：不需要关闭 Node-cache 连接，因为它是在进程内存中
    // 这里您可以选择重定向用户，返回错误消息等
    controller(req, res, next)
  }
}

module.exports = checkToken
