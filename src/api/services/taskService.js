const { logCreate, logUpdate } = require("../helpers/logQuery")
const { Tasks,infoUser } = require("../models")
const createError = require("http-errors")
const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("test.csv");

const taskService = {
    addTask: async(task, createBy)=>{
        return new Promise(async(resolve,reject)=>{
            try {
                await Tasks.create({
                    ...task,
                    ...logCreate(createBy),
                  })
                  resolve({
                    status: 201,
                    message: "Create new task successfully !",
                  })
            } catch (error) {
                reject(error)
            }
        })
    },
    update: async(
        name_task,
        desc,
        start_time,
        end_time,
        status_task,
        id,
        userId)=>{
        return new Promise(async(resolve,reject)=>{
            try {
                const exist = await Tasks.findOne({
                    where: {
                        id:id,
                        IS_DELETED:false
                    }
                })
                if(!exist)
                    throw createError.NotFound("task id not exists")
                let response = await Tasks.update(
                    {
                        name_task,
                        desc,
                        start_time,
                        end_time,
                        status_task,
                      ...logUpdate(userId),
                    },
                    {
                      where: {
                        id: id,
                        IS_DELETED: false,
                      },
                    }
                  )
                resolve({
                    status:response?200:401,
                    message:response
                    ?"Update task successfully!"
                    :"While error update task"
                })
            } catch (error) {
                reject(error)
            }
            
            
        })
    },
    importExcel:async()=>{
        return new Promise(async(resolve,reject)=>{
            try {
                const data = await infoUser.findAll({
                    where:{
                        IS_DELETED:false
                    }
                })
                const jsonData = JSON.parse(JSON.stringify(data));
                fastcsv
                .write(jsonData, { headers: true })
                .on("finish", function() {
                    resolve({
                        status:200,
                        message:"Write to test.csv successfully!"
                    })
                    
                })
                .pipe(ws);
                 
            } catch (error) {
                reject(error)
            }
        })
    },
    
}
module.exports = taskService;