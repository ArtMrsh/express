const List = require('../models/list.model');

exports.findAllLists = (req, res, next) => {
  List.find({}).populate('tasks boardId')
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(err.message)
    })
}

exports.findListById = (req, res, next) => {
  List.findById(req.params.id).populate('tasks boardId')
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(err.message)
    })
}

exports.createList = (req, res, next) => {
  
  const list = new List({
    name: req.body.name,
    boardId: req.body.boardId,
    tasks: req.body.tasks
  })

  list.save()
    .then(result => {
      res.send(result)
    }).catch(err => {
      res.status(500).send(err.message)
    })

}

exports.updateList = (req, res, next) => {
  List.findByIdAndUpdate(req.params.listId, req.body, { new: true })
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

exports.removeList = (req, res, next) => {
  const listId = req.params.listId; 
  List.findByIdAndRemove(listId)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(404).send('Not found')
    })
}