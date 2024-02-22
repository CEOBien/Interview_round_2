const createError = require("http-errors")
const createSucess = require("../helpers/createSuccess")
const taskService = require("../services/taskService")


const taskController = {
    addTask: async (req, res, next) => {
    try {
      const { name_task,desc,start_time,end_time,status_task,userId } = req.body

      const { status, message } = await taskService.addTask(
        {
            name_task,
            desc,
            start_time,
            end_time,
            status_task
        },
        userId
      )

      return res.status(status).json(createSucess(status, message))
    } catch (error) {
      next(error)
    }
  },
  updateTask: async (req, res, next) => {
    try {
        const { name_task,desc,start_time,end_time,status_task,userId } = req.body
      const { id } = req.params

      const { status, message } = await taskService.update(
        name_task,
        desc,
        start_time,
        end_time,
        status_task,
        id,
        userId
      )

      res.status(status).json(createSucess(status, message))
    } catch (error) {
      next(error)
    }
  },
  importExcel: async(req,res,next)=>{
    try {
        const {status,message} = await taskService.importExcel();
        res.status(status).json(createSucess(status, message))
    } catch (error) {
        next(error)
    }
  },
  sendEmailListTask : async(req,res,next)=>{
    try {
        const email = req.body.email;
        const {status,message} = await taskService.sendEmailTask(email)
        res.status(status).json(createSucess(status, message))
    } catch (error) {
        next(error)
    }
  }
}

module.exports = taskController

