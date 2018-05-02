const router = require('express').Router();
const Board = require('../models/board.model');


router.get('/', (req, res, next) => {
  Board.find()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(result)
    })
})

router.get('/:id', (req, res, next) => {
  Board.findById(req.params.id)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(err.message)
    })
})

router.post('/', (req, res, next) => {

  const board = new Board({
    name: req.body.name,
    lists: req.body.lists
  })

  board.save()
    .then(result => {
      res.send(result)
    }).catch(err => {
      res.status(500).send(err.message)
    })

})

router.put('/:boardId', (req, res, next) => {
  Board.findByIdAndUpdate(req.params.boardId, req.body, { new: true })
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

router.delete('/:boardId', (req, res, next) => {
  const boardId = req.params.boardId; 
  Board.findByIdAndRemove(boardId)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(404).send('Not found')
    })
})

module.exports = router;