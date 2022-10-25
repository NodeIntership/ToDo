const mongoose = require("mongoose");
const todoSchema = require("./Schemas/todo.schema");
const { findCategoryById } = require("./categoriesModel");

const todoModel = mongoose.model("todo", todoSchema);

async function create(info) {
  let category = findCategoryById(info.category);

  if (!category) {
    return null;
  }

  let result = await todoModel.create(info);

  return result;
}

async function findMeny() {
  let list = await todoModel.find();
  return list;
}

async function findRowById(id) {
  let result = await todoModel.findById(id);

  if (!result) {
    return null;
  }

  result.populate("category").exec((e, list) => {
    if (e) {
      res.send(e.message);
      return;
    }
    result = list;
  });
  return result;
}

async function updateRow(id, info) {
  let row = await todoModel.findById(id);
  if (!row) {
    return null;
  }
  for (let key in info) {
    row[key] = info[key];
  }
  await row.save();
  return row;
}

async function removeRow(id) {
  let row = await todoModel.findByIdAndRemove(id);
  if (!row) {
    return null;
  }
  return { message: "Row removed" };
}

module.exports = {
  create,
  findMeny,
  findRowById,
  updateRow,
  removeRow,
};
