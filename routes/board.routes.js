const router = require('express').Router();
const boards = require('./../controllers/board.controller');

router.get('/', boards.findAllBoards);
router.get('/:id', boards.findBoardById);
router.post('/', boards.createBoard);
router.put('/:boardId', boards.updateBoard);
router.delete('/:boardId', boards.removeBoard);

module.exports = router;