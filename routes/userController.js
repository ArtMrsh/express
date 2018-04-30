const router = require('express').Router();
const checkValidity = require('../helpers/checkValidity');


  
router.get('/', (req, res, next) => {
  res.send(users);
})



router.get('/:name', (req, res, next) => {
  const foundedUser = users.find((obj) => obj.name == req.params.name.toLowerCase());

  if (foundedUser) {
    res.send(foundedUser)
  } else {
    res.status(404).send(`User with name '${req.params.name}' does not exists`)
  }

})

router.post('/', (req, res, next) => {
  users.push(req.query);

  req.check('name', 'Name is not valid').isLength({min: 0});
  
  if(checkValidity(req.validationErrors())) {
    res.send(users)
  } else {
    res.status(418).send(req.validationErrors())
  }
  
})

router.put('/:name', (req, res, next) => {
  const foundedUser = users.find((obj) => obj.name == req.params.name.toLowerCase());

  if (foundedUser) {
    Object.assign(foundedUser, req.query)
    res.send(foundedUser)
  } else {
    res.status(404).send(`User with name '${req.params.name}' does not exists`)
  }

})

router.delete('/:name', (req, res, next) => {
  const foundedUser = users.find((obj) => obj.name == req.params.name);

  if (foundedUser) {
    res.send(users.splice(foundedUser, 1))
  } else {
    res.status(404).send(`User with name '${req.params.name}' does not exists`)
  }

})

module.exports = router;