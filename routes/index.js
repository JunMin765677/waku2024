const adminRoutes = require ('./modules/admin');
const portfolioRoutes = require ('./modules/admin-portfolio');
const s3Routes = require('./modules/s3upload');
const wakuRoutes = require('./modules/waku');
const spotsRoutes = require('./modules/spotsmap');
const spotsShopRoutes = require('./modules/spotsmapShop');
const users = require('./modules/users')
  
module.exports = app => {
    app.use('/', s3Routes);
    app.use('/', wakuRoutes);
    app.use('/admin', adminRoutes);
    app.use('/admin', portfolioRoutes);
    app.use('/skateboard.map.spot', spotsRoutes);
    app.use('/skateboard.map.spot', spotsShopRoutes);
    app.use('/skateboard.map.spot/users', users);
}
