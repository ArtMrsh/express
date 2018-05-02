const passport = require('passport');
const User = require('../models/user.model');
const localStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
   done(null, user.id)
})

passport.deserializeUser((id, done) => {
   User.findById(id)
      .then(user => {
         done(user);
      })
})

passport.use(new LocalStrategy(
   function(username, password, done) {
     User.findOne({ username: username }, function (err, user) {
       if (err) { return done(err); }
       if (!user) { return done(null, false); }
       if (!user.verifyPassword(password)) { return done(null, false); }
       return done(null, user);
     });
   }
 ));