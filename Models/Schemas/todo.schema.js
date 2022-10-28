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
    type: Schema.Types.ObjectId,
    ref: "categories",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = todoSchema;
