const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Define the Task schema
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  deadline: String,
  createdAt: String
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
  const newTask = new Task(req.body);
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







// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// require("./TaskSchema");
// const Task = mongoose.model("task");

// app.use(bodyParser.json());

// const mongURL = "mongodb+srv://Salim2017:OeMdsO7TpVBLVrP1@cluster0.apqm1pu.mongodb.net/taskapp?retryWrites=true&w=majority";
// mongoose.connect(mongURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// mongoose.connection.on("connected", () => {
//   console.log("Connect Success");
// });

// mongoose.connection.on("error", (err) => {
//   console.log("error", err);
// });

// app.post('/send-data', (req, res) => {
//   const task = new Task({
//     title: req.body.title,
//     description: req.body.description,
//     status: req.body.status,
//     deadline: req.body.deadline,
//     createdAt: req.body.createdAt
//   });
//   task.save().then(data => {
//     console.log(data);
//     res.send(data);
//   }).catch(err => {
//     console.log(err);
//   });
// });
// app.get('/send-data', (req, res) => {
//   Task.find({})
//     .then(data => {
//       res.json(data);
//     })
//     .catch(err => {
//       console.error('Error fetching tasks:', err);
//       res.status(500).send('Error fetching tasks.');
//     });
// });

// app.put('/update/:_id', (req, res) => {
//   const taskId = req.params._id;  
//   const updatedTask = {
//     title: req.body.title,
//     description: req.body.description,
//     status: req.body.status,
//     deadline: req.body.deadline,
//     createdAt: req.body.createdAt,
//   };

//   Task.findByIdAndUpdate(taskId, updatedTask, { new: true })
//     .then(updatedTask => {
//       res.json(updatedTask);
//     })
//     .catch(err => {
//       console.error('Error updating task:', err);
//       res.status(500).send('Error updating task.');
//     });
// });


// app.delete('/delete/:_id', (req, res) => {
//   const taskId = req.params._id;

//   Task.findByIdAndDelete(taskId)
//     .then(() => {
//       res.send('Task deleted successfully.');
//     })
//     .catch(err => {
//       console.error('Error deleting task:', err);
//       res.status(500).send('Error deleting task.');
//     });
// });


// app.listen(3000, () => {
//   console.log("Server Running on 3000");
// });