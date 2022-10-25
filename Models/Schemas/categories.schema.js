const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
});

module.exports = categoriesSchema