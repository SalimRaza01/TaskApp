const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  status: String,
  deadline: Date,
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
})

mongoose.model("task", TaskSchema)
