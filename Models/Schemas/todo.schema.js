const mongoose = require("mongoose");
const { Schema } = require("mongoose");
let { PENDING, COMPLETED } = require("../../Utils/constants");

const todoSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: [PENDING, COMPLETED],
  },
  date: {
    type: Date,
    default: new Date(),
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
  },
});

module.exports = todoSchema;
