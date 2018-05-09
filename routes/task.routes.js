const router = require('express').Router();
const tasks = require('./../controllers/task.controller');

router.get('/', tasks.findAllTasks);
router.get('/:id', tasks.findTaskById);
router.post('/', tasks.createTask);
router.put('/:taskId', tasks.updateTask);
router.delete('/:taskId', tasks.removeTask);

module.exports = router;