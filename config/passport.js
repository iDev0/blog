const {
  Strategy,
  ExtractJwt
} = require('passport-jwt')

const userModel = require('../model/user')

const opts = {}

// 헤더에 토큰이 담긴다
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET_KEY

module.exports = passport => {
  passport.use(
    new Strategy(opts, (jwt_payload, done) => {
      userModel
        .findById(jwt_payload.id)
        .then(user => {
          if (!user) {
            return done(null, false)
          }
          done(null, user)
        })
        .catch(err => console.log(err))
    })
  )
}