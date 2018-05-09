const router = require('express').Router();
const lists = require('./../controllers/list.controller');

router.get('/', lists.findAllLists);
router.get('/:id', lists.findListById);
router.post('/', lists.createList);
router.put('/:listId', lists.updateList);
router.delete('/:listId', lists.removeList);

module.exports = router;