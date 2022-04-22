const mongoose = require("mongoose");

// TODO: Connect to MangoDB
mongoose.connect('mongodb://localhost:27017/Todos', {useUnifiedTopology: true});


// Check if connection is successfull
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// TODO:  Define the Schema for the Tasks collection
const MySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: Number,
  },
  categories: {
    type: Array,
  },
  author: {
    type: Object,
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'students'
  }
});

// TODO:  Define the Schema for the Tasks collection
const MyStudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  class: {
      type: String,
      required: true
  }
})


// Create the Model for the Tasks collection from Schema
const TaskModel = mongoose.model('tasks', MySchema);
const StudentModel = mongoose.model('students', MyStudentSchema);

module.exports.StudentModel = StudentModel;
module.exports.TaskModel = TaskModel;
