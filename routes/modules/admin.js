const express = require('express'); 
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'temp/' })

const passport = require('../../config/passport')
const session = require('express-session')
router.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());

const { authenticatedAdmin } = require('../../middleware/auth')


const adminController = require('../../controllers/admin');
const shopAdminController = require('../../controllers/shopAdmin')


router.get('/login', shopAdminController.loginPage)
router.post('/login', shopAdminController.login)
router.get('/logout', shopAdminController.logout)


//  Blog ==============================================================
router.get('/', authenticatedAdmin, adminController.home);
router.get('/blogList', authenticatedAdmin, adminController.blogList);
router.get('/blogNew', authenticatedAdmin, adminController.blogNew);
router.post('/handleBlogNew', authenticatedAdmin, adminController.handleBlogNew);
router.get('/BlogEdit/:id', authenticatedAdmin, adminController.BlogEdit);
router.post('/handleBlogEdit', authenticatedAdmin, adminController.handleBlogEdit);
router.get('/BlogDelete/:id', authenticatedAdmin, adminController.BlogDelete)

//  Rider ==============================================================
router.get('/riderList', authenticatedAdmin, adminController.riderList);
router.get('/simpleRiderList', authenticatedAdmin, adminController.simpleRiderList);
router.get('/riderNew', authenticatedAdmin, adminController.riderNew);
router.post('/handleRiderNew', authenticatedAdmin, adminController.handleRiderNew);
router.get('/riderEdit/:id', authenticatedAdmin, adminController.riderEdit);
router.post('/handleRiderEdit', adminController.handleRiderEdit);
router.get('/riderDelete/:id', authenticatedAdmin, adminController.riderDelete)
router.post('/updateOnce', adminController.updateOnce);


//  Event ==============================================================
router.get('/eventList', authenticatedAdmin, adminController.eventList);
router.get('/eventNew', authenticatedAdmin, adminController.eventNew);
router.post('/handleEventNew', authenticatedAdmin, upload.single('image'), adminController.handleEventNew);
router.get('/eventEdit/:id', authenticatedAdmin, adminController.eventEdit); 
router.put('/eventEdit/:id', authenticatedAdmin, upload.single('image'), adminController.handleEventEdit)
router.get('/eventDone/:id', authenticatedAdmin, adminController.eventDone);
router.get('/eventDelete/:id', authenticatedAdmin, adminController.eventDelete);

//  Shop ==============================================================
// products
router.get('/products', authenticatedAdmin, shopAdminController.getProducts)
router.get('/productNew', authenticatedAdmin, shopAdminController.productNew)
router.post('/products', authenticatedAdmin, upload.single('image'), shopAdminController.postProduct)
router.get('/products/:id', authenticatedAdmin, shopAdminController.editProduct)
router.put('/products/:id', authenticatedAdmin, upload.single('image'), shopAdminController.putProduct)
router.delete('/products/:id', authenticatedAdmin, shopAdminController.deleteProduct)

// orders
router.get('/orders', authenticatedAdmin, shopAdminController.getOrders)
router.get('/orders/:id', authenticatedAdmin, shopAdminController.getOrder)
router.post('/orders/:id/ship', authenticatedAdmin, shopAdminController.shipOrder)
router.post('/orders/:id/cancel', authenticatedAdmin, shopAdminController.cancelOrder)
router.post('/orders/:id/recover', authenticatedAdmin, shopAdminController.recoverOrder)

// authority
router.get('/authority', authenticatedAdmin, shopAdminController.getUsers)
router.post('/authority/:id', authenticatedAdmin, shopAdminController.changeAuth)

// router.get('/products', authenticatedAdmin, shopAdminController.products);
// router.get('/orders', authenticatedAdmin, shopAdminController.orders);
// router.get('/users', authenticatedAdmin, shopAdminController.users);


module.exports = router; 