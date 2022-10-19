const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  }
});

const listModel = mongoose.model("List", listSchema)

module.exports = listModel