const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    deadline: String,
    createdAt: String
})

mongoose.model("task",TaskSchema)
