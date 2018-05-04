const router = require('express').Router();

router.post('/auth/login',
  passport.authenticate('local'),
  (req, res, next) => {
    if (req.isAuthenticated()) {
      res.send(req.user);
    } else {
      res.sendStatus(401);
    }
  }
);