const router = require('express').Router();
const Task = require('../models/task.model');

router.get('/', (req, res, next) => {
  Task.find()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(result)
    })
})

router.get('/:id', (req, res, next) => {
  Task.findById(req.params.id)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(err.message)
    })
})

router.post('/', (req, res, next) => {

  const task = new Task({
    name: req.body.name,
    lists: req.body.lists
  })

  task.save()
    .then(result => {
      res.send(result)
    }).catch(err => {
      res.status(500).send(err.message)
    })

})

router.put('/:taskId', (req, res, next) => {
  Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true })
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

router.delete('/:taskId', (req, res, next) => {
  const taskId = req.params.taskId; 
  Task.findByIdAndRemove(taskId)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(404).send('Not found')
    })
})

module.exports = router;