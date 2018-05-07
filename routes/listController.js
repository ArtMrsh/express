const router = require('express').Router();
const List = require('../models/list.model');

router.get('/', (req, res, next) => {
  List.schema.method.updateData((err, data) => {
    if (err) {
      next(err)
    } else {
      res.send(data)
    }
  })
})

router.get('/:id', (req, res, next) => {
  List.findById(req.params.id)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(err.message)
    })
})

router.post('/', (req, res, next) => {

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

})

router.put('/:listId', (req, res, next) => {
  List.findByIdAndUpdate(req.params.listId, req.body, {
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
})

router.delete('/:listId', (req, res, next) => {
  const listId = req.params.listId;
  List.findByIdAndRemove(listId)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(404).send('Not found')
    })
})

module.exports = router;