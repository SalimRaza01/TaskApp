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

app.post('/delete', (req, res) => {
  Task.findByIdAndRemove(req.body.id).then(data => {
    console.log(data);
    res.send(data);
  }).catch(err => {
    console.log("error", err);
  });
});

app.post('/update', (req, res) => {
  Task.findByIdAndUpdate(req.body.id, {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    deadline: req.body.deadline,
    createdAt: req.body.createdAt
  }).then(data => {
    console.log(data)
    res.send(data)
  }).catch(err => {
    console.log("error", err)
  })
})

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

app.get('/', (req, res) => {
  Task.find({})
  .then(data=>{
    console.log(data)
    res.send("Get List")
  }).catch(err => {
    console.log(err)
  })
});

app.listen(3000, () => {
  console.log("Server Running on 3000");
});