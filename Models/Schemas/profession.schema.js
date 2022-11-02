const mongoose = require("mongoose");

const professionSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = professionSchema;
