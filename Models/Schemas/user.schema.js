const { Schema } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surnam: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  email: {
    type: String,
    unique: true,
    required: true,

  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = userSchema;
