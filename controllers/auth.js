const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const config = require('../config');



passport.use(new GoogleStrategy({
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  // callbackURL: "http://localhost:5001/google/callback",
  callbackURL: "https://wakudesign.com/google/callback",
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});



// 新增第二個 Google Strategy
passport.use('google-admin', new GoogleStrategy({
  clientID: config.GOOGLE_CLIENT_ID, // 使用另一個Google應用程式的clientID
  clientSecret: config.GOOGLE_CLIENT_SECRET, // 使用另一個Google應用程式的clientSecret
  callbackURL: "http://localhost:5001/admin/google/callback",
  // callbackURL: "https://wakudesign.com/admin/google/callback",
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));
