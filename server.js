const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://Salim2017:OeMdsO7TpVBLVrP1@cluster0.apqm1pu.mongodb.net/taskapp?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  deadline: String,
  createdAt: String
});

const Task = mongoose.model('Task', taskSchema);

app.post('/tasks', (req, res) => {
  const taskData = req.body;

  // Validation
  if (!taskData.title || !taskData.description || !taskData.deadline) {
    return res.status(400).json({ error: 'Title, description, and deadline are required fields.' });
  }

  const task = new Task(taskData);

  task.save((error, savedTask) => {
    if (error) {
      res.status(500).json({ error: 'Error adding task.' });
    } else {
      res.status(201).json(savedTask);
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
