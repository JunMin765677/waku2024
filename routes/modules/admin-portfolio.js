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


const portfolioController = require('../../controllers/admin-portfolio');

router.get('/frontend', authenticatedAdmin, portfolioController.frontend)
router.get('/media', authenticatedAdmin, portfolioController.media)
router.get('/graphicDesign', authenticatedAdmin, portfolioController.GraphicDesign)
// router.post('/uploadPortfolio', authenticatedAdmin, upload.single('image'),portfolioController.upload)
router.post('/uploadPortfolio', authenticatedAdmin, upload.array('image', 20), portfolioController.upload);
router.delete('/portfolio/:id', authenticatedAdmin, portfolioController.delete)
 
 

module.exports = router; 