const mongoose = require("mongoose");
const categoriesSchema = require("./Schemas/categories.schema");

const categoriesModel = mongoose.model("Categories", categoriesSchema);

async function create(info) {
  let result = await categoriesModel.create(info);
  return result;
}

async function findMeny() {
  let list = await todoModel.find();
  return list;
}

async function findCategoryById(id) {
  let category = await categoriesModel.findById(id);

  return category;
}

async function updateCategory(id, info) {
  let cat = await todoModel.findById(id);
  if (!cat) {
    return null;
  }
  for (let key in info) {
    cat[key] = info[key];
  }
  await cat.save();
  return cat;
}

async function removeCategory(id) {
  let cat = await todoModel.findByIdAndRemove(id);
  if (!cat) {
    return null;
  }
  return { message: "Category removed" };
}

module.exports = {
  findCategoryById,
  create,
  findMeny,
  updateCategory,
  removeCategory,
};
