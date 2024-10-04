const express = require("express");
const router = express.Router()

const {getAllTasks, getTask, editTask, deleteTask, createTask} = require('../controller/tasks')

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(editTask).delete(deleteTask)

module.exports = router