const mongoose = require("mongoose");
let { todoStatus } = require("../Utils/constants")

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: todoStatus,
  },
  date: {
    type: Date,
    default: new Date
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
  },
});

const todoModel = mongoose.model("todo", todoSchema)

module.exports = todoModel