const express = require('express');
const mongoose = require('mongoose');
const taskSchema = require('./taskSchema');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:3000/cluster0', { useNewUrlParser: true, useUnifiedTopology: true });
const Task = mongoose.model('Task', new mongoose.Schema({}, { strict: false }));

app.use(express.json());

app.post('/tasks', async (req, res) => {
  const taskData = req.body;

  try {
    await taskSchema.validate(taskData, { abortEarly: false });
    const task = new Task(taskData);
    await task.save();
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    res.status(400).json({ error: error.errors.join('\n') });
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
