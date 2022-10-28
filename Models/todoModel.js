const mongoose = require("mongoose");
const todoSchema = require("./Schemas/todo.schema");
const { findCategoryById } = require("./categoriesModel");
const { getUserById } = require("./userModel");

const todoModel = mongoose.model("todo", todoSchema);

async function create(info) {
  let category = await findCategoryById(info.category);
  if (!category) {
    throw new Error("category")
  }
  let user = await getUserById(info.userId);
  if(!user){
    throw new Error("user")
  }

  let result = await todoModel.create(info);

  return result;
}

async function findMany() {
  let list = await todoModel.find({isDeleted: {$ne: true}});
  return list;
}

async function findRowById(id) {
  let result = await todoModel
    .findOne({_id: id, isDeleted: { $ne: true } })
    .populate("category")
    .populate("userId")
    .exec();
  return result
}

async function updateRow(id, info) {
  let row = await todoModel.findOne({ _id: id, isDeleted: { $ne: true } });
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
  let row = await todoModel.findOne({ _id: id, isDeleted: { $ne: true } });
  if (!row) {
    return null;
  }
  row.isDeleted = true;
  row.save()

  return { message: "Row removed" };
}

module.exports = {
  create,
  findMany,
  findRowById,
  updateRow,
  removeRow,
};
