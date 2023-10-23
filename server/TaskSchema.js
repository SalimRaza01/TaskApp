const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    status: String,
    deadline: String,
    createdAt: String,
    comments: [String],
})

mongoose.model("task",TaskSchema)
