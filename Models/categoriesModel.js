const mongoose = require("mongoose");
const categoriesSchema = require("./Schemas/categories.schema");

const categoriesModel = mongoose.model("categories", categoriesSchema);

async function create(info) {
  let result = await categoriesModel.create(info);
  return result;
}

async function findCategories() {
  let list = await categoriesModel.find();
  return list;
}

async function findCategoryById(id) {
  let category = await categoriesModel.findById(id);

  return category;
}

async function updateCategory(id, info) {
  let cat = await categoriesModel.findById(id);
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
  let cat = await categoriesModel.findByIdAndRemove(id);
  if (!cat) {
    return null;
  }
  return { message: "Category removed" };
}

module.exports = {
  findCategoryById,
  create,
  findCategories,
  updateCategory,
  removeCategory,
};
