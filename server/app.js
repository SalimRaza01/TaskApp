const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require("./TaskSchema");
const Task = mongoose.model("task");

app.use(bodyParser.json());

const mongURL = "mongodb+srv://Salim2017:OeMdsO7TpVBLVrP1@cluster0.apqm1pu.mongodb.net/taskapp?retryWrites=true&w=majority";
mongoose.connect(mongURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
  console.log("Connect Success");
});

mongoose.connection.on("error", (err) => {
  console.log("error", err);
});

app.post('/send-data', (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    deadline: req.body.deadline,
    createdAt: req.body.createdAt
  });
  task.save().then(data => {
    console.log(data);
    res.send(data);
  }).catch(err => {
    console.log(err);
  });
});
app.get('/send-data', (req, res) => {
  Task.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error('Error fetching tasks:', err);
      res.status(500).send('Error fetching tasks.');
    });
});

app.put('/update/:_id', (req, res) => {
  const taskId = req.params._id;  
  const updatedTask = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    deadline: req.body.deadline,
    createdAt: req.body.createdAt,
  };

  Task.findByIdAndUpdate(taskId, updatedTask, { new: true })
    .then(updatedTask => {
      res.json(updatedTask);
    })
    .catch(err => {
      console.error('Error updating task:', err);
      res.status(500).send('Error updating task.');
    });
});

app.delete('/delete/:_id', (req, res) => {
  const taskId = req.params._id;

  Task.findByIdAndDelete(taskId)
    .then(() => {
      res.send('Task deleted successfully.');
    })
    .catch(err => {
      console.error('Error deleting task:', err);
      res.status(500).send('Error deleting task.');
    });
});


app.listen(3000, () => {
  console.log("Server Running on 3000");
});