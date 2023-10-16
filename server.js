const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// Define the Task schema
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  deadline: String,
  createdAt: String
});

const Task = mongoose.model('Task', taskSchema);

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://Salim2017:OeMdsO7TpVBLVrP1@cluster0.apqm1pu.mongodb.net/taskapp?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => console.error('Connection to MongoDB Atlas failed:', err));

// Create a new task
app.post('/tasks', (req, res) => {
  const newTask = new Task({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    deadline: req.body.deadline,
    createdAt: req.body.createdAt
  });
  newTask.save().then(data => {
    console.log(data)
    res.send("success")
  }).catch(err => {
    console.log(err)
  })
})
//   newTask.save((err, task) => {
//     if (err) throw err;
//     res.json(task);
//   });
// });

// Update a task by ID
app.put('/tasks/:id', (req, res) => {
  const taskId = req.body.id;
  const updatedTask = req.body;

  Task.findByIdAndUpdate(taskId, updatedTask, { new: true }, (err, task) => {
    if (err) throw err;
    res.json(task);
  });
});

// Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.body.id;

  Task.findByIdAndDelete(taskId, (err) => {
    if (err) throw err;
    res.send(`Task with ID ${taskId} deleted`);
  });
});

// Toggle task completion by ID
app.put('/tasks/:id/toggle', (req, res) => {
  const taskId = req.body.id;

  Task.findById(taskId, (err, task) => {
    if (err) throw err;

    task.status = task.status === 'Pending' ? 'Completed' : 'Pending';

    task.save((err, updatedTask) => {
      if (err) throw err;
      res.send(`Task status toggled to ${updatedTask.status}`);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});