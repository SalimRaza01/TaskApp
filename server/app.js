const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  deadline: Date,
  createdAt: Date,
  comments: [String],
  userId: String, 
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
  },
});
const Task = mongoose.model('Task', taskSchema);

const User = mongoose.model('User', {
  email: String,
  password: String,
  username: String,
});

app.use(bodyParser.json());

const mongURL =
  'mongodb+srv://Salim2017:OeMdsO7TpVBLVrP1@cluster0.apqm1pu.mongodb.net/taskapp?retryWrites=true&w=majority';
mongoose.connect(mongURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    if (user.password === password) {
      const token = jwt.sign({ userId: user._id }, 'your_secret_key_here');
      return res.json({
        message: 'Login successful',
        user: { email: user.email, username: user.username },
        token: token,
      });
    } else {
      return res.status(401).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/send-data', (req, res) => {
  const newTaskData = req.body;
  const token = req.headers.authorization.split(' ')[1];
  const { userId } = jwt.verify(token, 'your_secret_key_here');

  newTaskData.createdAt = new Date(newTaskData.createdAt);
  newTaskData.deadline = new Date(newTaskData.deadline + 'Z');
  newTaskData.userId = userId;

  const newTask = new Task(newTaskData);
  newTask
    .save()
    .then((data) => {
      console.log('Task saved successfully:', data);
      res.json(data);
    })
    .catch((err) => {
      console.error('Error saving task:', err);
      res.status(500).send('Error saving task.');
    });
});

app.get('/send-data', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const { userId } = jwt.verify(token, 'your_secret_key_here');

  Task.find({ userId })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.error('Error fetching tasks:', err);
      res.status(500).send('Error fetching tasks.');
    });
});

app.put('/update/:id', (req, res) => {
  const taskId = req.params.id;

  Task.findByIdAndUpdate(taskId, req.body, { new: true })
    .then((updatedTask) => {
      if (!updatedTask) {
        return res.status(404).send('Task not found.');
      }
      res.json(updatedTask);
    })
    .catch((err) => {
      console.error('Error updating task:', err);
      res.status(500).send('Error updating task.');
    });
});

app.delete('/delete/:id', (req, res) => {
  const taskId = req.params.id;

  Task.findByIdAndDelete(taskId)
    .then((deletedTask) => {
      if (!deletedTask) {
        return res.status(404).send('Task not found.');
      }
      res.send('Task deleted successfully.');
    })
    .catch((err) => {
      console.error('Error deleting task:', err);
      res.status(500).send('Error deleting task.');
    });
});

app.post('/save-comment', (req, res) => {
  const { taskId, comment } = req.body;

  Task.findById(taskId)
    .then((task) => {
      if (!task) {
        return res.status(404).send('Task not found.');
      }
      task.comments = task.comments || [];
      task.comments.push(comment);
      return task.save();
    })
    .then((updatedTask) => {
      res.json(updatedTask);
    })
    .catch((err) => {
      console.error('Error saving comment:', err);
      res.status(500).send('Error saving comment.');
    });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
