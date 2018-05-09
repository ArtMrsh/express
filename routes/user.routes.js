const router = require('express').Router();
const users = require('./../controllers/user.controller');

router.get('/', users.findAllUsers);
router.get('/:id', users.findUserById);
router.post('/register', users.createUser);
router.post('/login', users.loginUser);
router.put('/:userId', users.updateUser);
router.delete('/:userId', users.removeUser);

module.exports = router;