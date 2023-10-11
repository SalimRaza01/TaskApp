// const express = require('express');
// const mongoose = require('mongoose');

// const app = express();
// const PORT = process.env.PORT || 3000;

// mongoose.connect('mongodb://152.58.64.181:3000/taskapp', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // pasword taJboacOPfZ5Oc1u

// const taskSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ['Pending', 'Completed'],
//     required: true,
//   },
//   deadline: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: String,
//     required: true,
//   },
// });

// const Task = mongoose.model('Task', taskSchema);

// app.use(express.json());

// app.post('/tasks', async (req, res) => {
//   const taskData = req.body;

//   try {
//     const task = new Task(taskData);
//     await task.save();
//     res.status(201).json({ message: 'Task created successfully', task });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// app.get('/tasks', async (req, res) => {
//   try {
//     const tasks = await Task.find();
//     res.status(200).json(tasks);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
