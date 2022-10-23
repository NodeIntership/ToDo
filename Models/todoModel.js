const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["PENDING", "COMPLETED"],
  },
  date: {
    type: Date,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
  },
});

const listModel = mongoose.model("List", listSchema)

module.exports = listModel