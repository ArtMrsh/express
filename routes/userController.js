const router = require('express').Router();
const checkValidity = require('../helpers/checkValidity');
// const mongoose = require('mongoose');
const User = require('../models/user.model');


router.get('/', (req, res, next) => {
  User.find()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(result)
    })
})

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(err.message)
    })
})

router.post('/', (req, res, next) => {

  const user = new User({
    name: req.body.name,
    email: req.body.email
  })

  user.save()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(500).send(err.message)
    })

})

router.put('/:userId', (req, res, next) => {
  User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
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
})

router.delete('/:userId', (req, res, next) => {
  const userId = req.params.userId; 
  User.findByIdAndRemove(userId)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(404).send('Not found')
    })
})

module.exports = router;