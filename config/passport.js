const passport = require('passport');
const User = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;
const bycript = require('bcrypt');

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(user);
    })
})

passport.use('local', new LocalStrategy((login, password, done) => {
  User.findOne({ name: login })
    .select('_id password')
    .then(data => {
      if (!data) {
        done(false)
      }

      bycript.compare(password, data.password)
        .then(result => {
          if (result) {
            done(null, { id : data._id })
          } else {
            done(null, false);
          }
        })

    })
    .catch(done);
}));
