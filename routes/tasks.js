var express = require("express")
var router = express.Router()
const Task = require("../model/Task")

//Get all tasks
router.get("/tasks", (req, res) => {
    Task.findAll()
    .then(tasks => {
        res.json(tasks)
    })
    .catch(err => {
        res.send("error: " + err)
    })
})

//add task
router.post("/task", (req, res) => {
   if(!req.body.taskname){
       res.status(400)
       res.json({error: "bad data"})
   }else{
        Task.create(req.body)
        .then(()=>{
            res.send("Task Added")
        })
        .catch(err => {
            res.send("Error: " + err)
        })
   }      
})

//delete
router.delete("/task/:id", (req, res) => {
    Task.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(()=> {
        res.send("task deleted")
    })
    .catch(err=> {
        res.send("error: " + err)
    })
})

//update
router.put("/task/:id", (req, res)=>{
    if(!req.body.taskname){
        res.status(400)
        res.json({error: "bad data"})
    }else{
         Task.update(
            {taskname: req.body.taskname},
            {where: {id: req.params.id}}
        )
         .then(()=>{
             res.send("task update")
         })
         .catch(err => {
             res.send("Error: " + err)
         })
    }
})

module.exports=router