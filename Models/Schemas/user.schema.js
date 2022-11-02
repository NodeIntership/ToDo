const { Schema } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
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
  profession: {
    type: Schema.Types.ObjectId,
    ref: "professions",
    required: true
  },
  professionHidden: {
    type: Boolean,
    default: false
  }
});

module.exports = userSchema;
