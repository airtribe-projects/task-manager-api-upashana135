const express = require('express');
const tasks = require('./task.json');
const app = express();
const port = 3000;
const taskList = tasks.tasks

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

app.get("/", (req, res)=>{
    console.log("hello server up")
    res.send("hello world")
  })

const validator = (req, res, next)=>{
    const {title, description, completed} = req.body
    if(!title || !description || completed === undefined){
        return res.status(400).send("Missing required fields!")
    }
    if(typeof completed !== 'boolean'){
        return res.status(400).send("Completed field must be boolean!")
    }
    next();
}

// Retrieve all tasks.
app.get("/tasks", (req, res)=>{
    let completed = req.query.completed
    if (completed === 'true') {
        completed = true;
    } else if (completed === 'false') {
        completed = false;
    }
    // retrive the tasks where completed is true
    if(completed){
        let completedTask = taskList.filter(task => task.completed === completed )
        if(completedTask.length > 0 ){
            return res.status(200).send(completedTask)
        }else{
            return res.status(404).send("Data not found!")
        }
    }
    return res.status(200).send(taskList)
})

// Retrive tasks as per priority level
app.get("/tasks/priority/:level", (req, res)=>{
    const priority = req.params.level
    let taskByPriority = taskList.filter(task => task.priority === priority )
    if(taskByPriority.length > 0){
        return res.status(200).send(taskByPriority)
    }
    else{
        return res.status(404).send("Data not found!")
    }
})

// Retrieve a specific task by its ID.
app.get("/tasks/:id", (req, res)=>{
    const {id} = req.params;
    const result = taskList[id-1]
    if(result){
        return res.status(200).send(result)
    }else{
        return res.status(404).send("Data not found!")
    }
})

// Create a new task with the required fields (title, description, completed, priority).
app.post("/tasks", [validator], (req, res) => {
    const {title, description, completed, priority} = req.body
    let newTask = {}
    if(priority){
        newTask = {
            id: taskList.length ? taskList[taskList.length-1].id+1 : 1,
            title,
            description,
            completed,
            priority
        }
    }else{
        newTask = {
            id: taskList.length ? taskList[taskList.length-1].id+1 : 1,
            title,
            description,
            completed
        }
    }
    taskList.push(newTask)
    return res.status(201).send("New tasks added!")
})

// Update an existing task by its ID.
app.put("/tasks/:id", [validator], (req, res) => {
    const id = parseInt(req.params.id)
    const {title, description, completed, priority} = req.body
    let updatedTask = taskList.find(task => task.id === id)
    if(!updatedTask){
        return res.status(404).send("Task not found!")
    }
    else{
        updatedTask['title'] = title
        updatedTask['description'] = description
        updatedTask['completed'] = completed
        updatedTask['priority'] = priority
        return res.status(200).send("Task updated!")
    }
})

// Delete a task by its ID.
app.delete("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id)
    let task = taskList.find(task => task.id === taskId)
    if(!task){
        return res.status(404).send("Task not found!")
    }
    else{
        const index = taskList.indexOf(task)
        taskList.splice(index, 1)
        return res.status(200).send("Task deleted successfully!")
    }
})

module.exports = app;