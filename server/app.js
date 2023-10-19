const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Define the Task schema
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  deadline: Date,
  createdAt: Date,

});

taskSchema.virtual('creationDate').get(function() {
  const day = ('0' + this.createdAt.getDate()).slice(-2); // Get day of the month
  return day;
});

const Task = mongoose.model('Task', taskSchema);

app.use(bodyParser.json());

const mongURL = "mongodb+srv://Salim2017:OeMdsO7TpVBLVrP1@cluster0.apqm1pu.mongodb.net/taskapp?retryWrites=true&w=majority";
mongoose.connect(mongURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});

app.post('/send-data', (req, res) => {
  // Parse the createdAt field as a Date
  const newTaskData = req.body;
  newTaskData.createdAt = new Date(newTaskData.createdAt);

  const newTask = new Task(newTaskData);
  newTask.save()
    .then(data => {
      console.log("Task saved successfully:", data);
      res.json(data);
    })
    .catch(err => {
      console.error("Error saving task:", err);
      res.status(500).send('Error saving task.');
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

app.put('/update/:id', (req, res) => {
  const taskId = req.params.id; // Use 'id' instead of '_id'

  Task.findByIdAndUpdate(taskId, req.body, { new: true })
    .then(updatedTask => {
      if (!updatedTask) {
        return res.status(404).send('Task not found.');
      }
      res.json(updatedTask);
    })
    .catch(err => {
      console.error('Error updating task:', err);
      res.status(500).send('Error updating task.');
    });
});

app.delete('/delete/:id', (req, res) => {
  const taskId = req.params.id;

  Task.findByIdAndDelete(taskId)
    .then(deletedTask => {
      if (!deletedTask) {
        return res.status(404).send('Task not found.');
      }
      res.send('Task deleted successfully.');
    })
    .catch(err => {
      console.error('Error deleting task:', err);
      res.status(500).send('Error deleting task.');
    });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
