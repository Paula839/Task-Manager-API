const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/cusom-error')
const getAllTasks = asyncWrapper(async (req, res) => {
        const tasks = await Task.find({})
        res.status(200).json({tasks})
        res.status(500).json({msg: error})
})

const getTask = asyncWrapper(async (req, res, next) => {
    const {id: taskID} = req.params
    const task = await Task.findOne({_id:taskID})
    
    if(!task) {
        return next(createCustomError(`No Task with id : $(taskID)`, 404))
    }

    res.status(200).json({task})
})

const createTask = asyncWrapper( async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({task})
})

const editTask = asyncWrapper(async (req, res) => {

    const {id:taskID} = req.params
    const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {
        new:true,
        runValidators:true,
        
    })
    
    if(!task) {

        return next(createCustomError(`No Task with id : $(taskID)`, 404))
    }
    
    res.status(200).json({id:taskID, data:req.body})

})

const deleteTask = asyncWrapper(async (req, res) => {

    const {id:taskID} = req.params
    const task = await Task.findOneAndDelete({_id:taskID})
    if(!task) {

        return next(createCustomError(`No Task with id : $(taskID)`, 404))
    }

    res.status(200).send("Task deleted successfully.")        

})

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    editTask,
    deleteTask,

}