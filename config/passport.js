const db = require('../models')
const User = db.User
 
const bcrypt = require('bcryptjs')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy

const config = require('../config');


let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = config.JWT_SECRET
jwtOptions.passReqToCallback = true

const jwtStrategy = new JwtStrategy(jwtOptions, async (req, jwt_payload, next) => {
  try {
    const user = await User.findByPk(jwt_payload.id)
    if (!user) {
      return next(null, false)
    }
    // 把user轉為json，存在req中，方面待會存取
    req.user = user.toJSON()
    console.log('---jwt user---', req.user)
    return next(null, user)
  } catch (e) {
    console.log(e)
    return next(e, false)
  }
})

const googleStrategy = new GoogleStrategy({
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  callbackURL: config.URL + '/skateboard.map.spot/users/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const { email } = profile._json
    const password = Math.random().toString(36).slice(-8)

    const user = await User.findOrCreate({
      where: { email },
      defaults: {
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
        role: 'user'
      }
    })

    return done(null, user)
  } catch (e) {
    console.log('Error in Google OAuth:', e)
  }
})

passport.use(jwtStrategy)
passport.use(googleStrategy)

module.exports = passport
