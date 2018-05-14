const Board = require('../models/board.model');

exports.findAllBoards = (req, res, next) => {
  Board.find({}).populate('lists')
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(err)
    })
}

exports.findBoardById = (req, res, next) => {
  Board.findById(req.params.id).populate('lists')
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(err.message)
    })
}

exports.createBoard = (req, res, next) => {
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
}


exports.updateBoard = (req, res, next) => {
  Board.findByIdAndUpdate(req.params.boardId, req.body, {
      new: true
    })
    .then(result => {
      return result;
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err.message)
    })
}

exports.removeBoard = (req, res, next) => {
  const boardId = req.params.boardId;
  Board.findByIdAndRemove(boardId)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(404).send('Not found')
    })
}