const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true
  },
});

const categoriesModel = mongoose.model("Categories", categoriesSchema);

module.exports = categoriesModel;
