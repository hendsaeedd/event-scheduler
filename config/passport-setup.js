const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

passport.use(
  new LocalStrategy(
    {
      usernameField: 'hendsaeed',
      passwordField: '12345',
      avatarField: 'avatar',
    },
    (username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) {
          return done(err)
        }
        if (!user) {
          return done(null, false, { message: 'User not found' })
        }
        if (!user.validatePassword(password)) {
          return done(null, false, { message: 'Incorrect password' })
        }
        return done(null, user)
      })
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})
