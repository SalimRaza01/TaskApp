const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  deadline: String,
  createdAt: String,
  comments: [
    {
      commenterEmail: String,
      message: String,
      createdAt: Date,
    },
  ],
  userId: String,
  priority: String,
  assignedUser: String,
  email: String,
});

const Task = mongoose.model('Task', taskSchema);

const User = mongoose.model('User', {
  email: String,
  password: String,
  username: String,
});

app.use(bodyParser.json());

const secretKey = '7*56:ASDWxc09scniasheb5454';

const mongURL =
  'mongodb+srv://Salim2017:OeMdsO7TpVBLVrP1@cluster0.apqm1pu.mongodb.net/taskapp?retryWrites=true&w=majority';
mongoose.connect(mongURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', err => {
  console.error('Error connecting to MongoDB:', err);
});

app.post('/login', async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({email});
    if (!user) {
      return res.status(401).json({message: 'User not found'});
    }
    if (user.password === password) {
      const token = jwt.sign({userId: user._id}, secretKey, {expiresIn: '15d'});

      console.log('Generated token:', token, user._id);
      return res.json({
        message: 'Login successful',
        user: {email: user.email, username: user.username, userId: user._id},
        token: token,
      });
    } else {
      return res.status(401).json({message: 'Incorrect password'});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal server error'});
  }
});

app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({message: 'Authorization token is missing'});
  }

  const tokenParts = token.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== 'bearer') {
    return res.status(401).json({message: 'Invalid authorization header'});
  }

  const tokenValue = tokenParts[1];

  jwt.verify(tokenValue, secretKey, (error, decoded) => {
    if (error) {
      console.error(error);
      return res.status(401).json({message: 'Invalid token or token expired'});
    }
    req.userId = decoded.userId;

    next();
  });
});

app.post('/send-data', async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({message: 'Authorization token is missing'});
  }
  const tokenParts = token.split(' ');

  if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== 'bearer') {
    return res.status(401).json({message: 'Invalid authorization header'});
  }

  try {
    console.log(req.body)
    const {userId} = jwt.verify(tokenParts[1], secretKey);
    const newTaskData = req.body;

newTaskData.createdAt = new Date().toISOString();
    newTaskData.deadline = new Date(newTaskData.deadline).toISOString();

    newTaskData.userId = userId;
    newTaskData.email = req.body.email;
    newTaskData.assignedUser = req.body.assignedUser;

    const newTask = new Task(newTaskData);
    newTask
      .save()
      .then(data => {
        console.log('Task saved successfully:', data);
        res.json(data);
      })
      .catch(err => {
        console.error('Error saving task:', err);
        res.status(500).send('Error saving task.');
      });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token or token expired' });
  }
});


app.get('/send-data', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const {userId} = jwt.verify(token, secretKey);

  try {
    const getUser = await User.findById(userId);

    if (!getUser) {
      return res.status(404).json({message: 'User not found'});
    }

    const userEmail = getUser.email;

    const assignedTasks = await Task.find({assignedUser: userEmail});
    const userTasks = await Task.find({userId: userId});

    const responseData = {
      assignedTasks,
      userTasks,
    };

    return res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: 'Internal server error'});
  }
});

app.put('/update/:id', (req, res) => {
  const taskId = req.params.id;
  Task.findById(taskId)
    .then(task => {
      if (!task) {
        return res.status(404).send('Task not found.');
      }

      task.status = task.status === 'Pending' ? 'Completed' : 'Pending';

      task.save()
        .then(updatedTask => {
          res.json(updatedTask);
        })
        .catch(err => {
          console.error('Error updating task:', err);
          res.status(500).send('Error updating task.');
        });
    })
    .catch(err => {
      console.error('Error finding task:', err);
      res.status(500).send('Error finding task.');
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
app.post('/save-comment', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { userId } = jwt.verify(token, secretKey);

    const { taskId, comment } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).send('Task not found.');
    }

    const user = await User.findById(userId);
    const commenter = {
      email: user.email,
      username: user.username,
    };

    task.comments = task.comments || [];

const newComment = {
  commenter,
  message: comment,
  createdAt: new Date(),
};

console.log('New comment:', newComment);

task.comments.push(newComment);

await task.save();

res.json(task);

  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token or token expired' });
  }
});

app.get('/get-user-by-email', async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const userInfo = {
      username: user.username,

    };

    res.status(200).json(userInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
