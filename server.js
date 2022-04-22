const express = require("express");
var cors = require("cors");
const app = express();
app.use(cors({origin:"*"})); // To allow any origin
app.use(express.json()); // To read json data in request body

app.listen(3000, () => {
  console.log("App run on http://localhost:3000");
});

// import Task model
const myModel = require("./models/task_model");

// Define static route
app.use(express.static("public"));

// TODO: Define dynamic routes
// CREATE TASK 
app.post('/add_task', (req, res)=>{
  console.log(req.body);
  myModel.TaskModel.create(req.body)
  .then((result)=>{
    res.send(result);
  })
  .catch((error)=>{
    log.send(error);
  })
})

// GET ALL TASK
app.get('/tasks', (req, res)=>{
  myModel.TaskModel.find()
  .populate("assignee")
  .then((result)=>{
    res.send(result);
  })
  .catch((error)=>{
    console.log(error);
  })
})

// DELETE TASK
app.delete('/task/:id', (req, res)=>{
  myModel.TaskModel.deleteOne({_id: req.params.id})
  .then((result)=>{
    res.send(result);
  })
  .catch((error)=>{
    console.log(error);
  })
})

// UPDATE TASK
app.put('/task/edit/:id', (req, res)=>{
  myModel.TaskModel.updateOne({_id: req.params.id}, req.body)
  .then((result)=>{
    res.send(result);
  })
  .catch((error)=>{
    console.log(error);
  })
})

// FILTER THE TASK THAT NOT COMPLETE
app.get('/tasks/notcompleted/', (req, res)=>{
  myModel.TaskModel.find({completed: false})
  .then((result)=>{
    res.send(result);
  })
  .catch((error)=>{
    console.log(error);
  })
})

// GET DATA OF STUDENTS TASK
app.get('/students', (req, res)=>{
  myModel.StudentModel.find()
  .then((result)=>{
    res.send(result);
  })
  .catch((error)=>{
    res.send(error);
  })
})



