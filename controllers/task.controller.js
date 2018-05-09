const Task = require('../models/task.model');

exports.findAllTasks = (req, res, next) => {
  Task.find()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(result)
    })
}

exports.findTaskById = (req, res, next) => {
  Task.findById(req.params.id)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(err.message)
    })
}

exports.createTask = (req, res, next) => {

  const task = new Task({
    title: req.body.title,
    listId: req.body.listId,
    author: req.body.author
  })

  task.save()
    .then(result => {
      res.send(result)
    }).catch(err => {
      res.status(500).send(err.message)
    })

}

exports.updateTask = (req, res, next) => {
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
}

exports.removeTask = (req, res, next) => {
  const taskId = req.params.taskId;
  Task.findByIdAndRemove(taskId)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(404).send('Not found')
    })
}