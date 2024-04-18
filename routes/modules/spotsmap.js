const express = require('express');
const spots = express.Router();
const mapController = require('../../controllers/map')
const session = require('express-session')
 

// 使用環境變數
const dotenv = require('dotenv');
dotenv.config();
const config = require('../../config');

// 使用 RecaptchaV2
const { RecaptchaV2 } = require('express-recaptcha');
const recaptcha = new RecaptchaV2(config.RECAPTCHA_SITE_KEY, config.RECAPTCHA_SECRET_KEY);

const passport = require('passport');
// Google OAuth start -------------------------------------
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
  }
spots.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
spots.use(passport.initialize());
spots.use(passport.session());
spots.get('/login', (req, res) => {
    res.render('login');
});
spots.get('/auth/google',
    passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));
spots.get('/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/admin',
        failureRedirect: '/auth/google/failure'
    })
);
const db =require('../../models')
const Article = db.article
spots.get('/protected', isLoggedIn, async (req, res) => {
    try {
        let googleUser = req.user;
        let articles = await Article.findAll({}); // 等待查询结果
        res.render('services', { googleUser, Article: articles }); // 将结果传递给模板
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
});
spots.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
        console.log(err);
        }
        req.session.destroy();
        res.redirect('/');
    });
});
spots.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
        console.log(err);
        }
        req.session.destroy();
        res.redirect('/styles');
    });
});
spots.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
});
// Google OAuth end-------------------------------------

function redirectBack(req, res) {
    res.redirect('back')
}
      

// Map start-------------------------------------
function LoggedOrNot(req, res, next) {
    req.user ? next() : res.redirect('/auth/google');
  }
const cookieParser = require('cookie-parser');
spots.use(cookieParser());
spots.get('/', mapController.allSpot)
spots.get('/citySpot', mapController.citySpot)
spots.post('/handleAddLocation',recaptcha.middleware.verify, mapController.handleAddSpot)
spots.get('/spot/:id', mapController.spot)
spots.post('/handleAddReview', mapController.handleAddReview, redirectBack)
spots.get('/coming', mapController.coming)
spots.post('/feedback', mapController.feedback)
spots.get('/events', mapController.events)
spots.get('/event/:id', mapController.event)
spots.get('/addEvent', mapController.addEvent)
spots.post('/handleAddEvent', mapController.handleAddEvent)
spots.get('/styles', mapController.styles)
spots.get('/style/:id', mapController.style)
spots.post('/updateSkater', mapController.updateSkater)
spots.get('/admin', LoggedOrNot, mapController.admin)
spots.post('/deletePicture', mapController.deletePicture)
spots.post('/updateSpot', mapController.updateSpot)
spots.get('/interviews', mapController.interviews)
spots.get('/interview/:id', mapController.interview)
spots.get('/addInterview', mapController.addInterview)
spots.post('/handleAddInterview', mapController.handleAddInterview)
spots.get('/manage', mapController.manage)
spots.get('/editInterview/:id', mapController.editInterview)
spots.post('/updateInterview', mapController.updateInterview)
spots.get('/spotsmap', mapController.spotsmap)
spots.get('/riders', mapController.riders)
spots.get('/rider/:id', mapController.rider)
spots.post('/handleRiderEdit', mapController.handleRiderEdit);
// Map End-------------------------------------------------



module.exports = spots; 