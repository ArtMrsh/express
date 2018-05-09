const User = require('../models/user.model');
const passport = require('passport');

exports.findAllUsers = (req, res, next) => {
  User.find()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(result)
    })
}

exports.findUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(err.message)
    })
}

exports.createUser = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })

  newUser.save()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(err.message)
    })
}

exports.loginUser = (req, res, next) => {
  passport.authenticate('local'),
    (req, res, next) => {
      if (req.isAuthenticated()) {
        res.send(req.user);
      } else {
        res.sendStatus(401);
      }
    }
}

exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.params.userId, req.body, {
    new: true
  })
    .then(result => {
      return result;
    })
    .then(data => {
      console.log(data)
      res.send(data);
    })
    .catch(err => {
      res.send(err.message)
    })
}

exports.removeUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findByIdAndRemove(userId)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(404).send('Not found')
    })
}