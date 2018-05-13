const router = require('express').Router();
const users = require('./../controllers/user.controller');
const passport = require('passport');

router.get('/', users.findAllUsers);
router.get('/:id', users.findUserById);
router.post('/register', users.createUser);
router.post('/login', passport.authenticate('local'), users.loginUser);
router.put('/:userId', users.updateUser);
router.delete('/:userId', users.removeUser);

module.exports = router;