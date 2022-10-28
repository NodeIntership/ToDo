const {
  create,
  findCategories,
  findCategoryById,
  updateCategory,
  removeCategory,
} = require("../Models/categoriesModel");
const categoryValidation = require("../Validations/category.validation");
const { categoryUpdateValidationSchema } = require("../Validations/update.validation");

async function createCategory(req, res) {
  let validTitle = categoryValidation.validate(req.body);
  if (validTitle.error) {
    res.json({ message: validTitle.error.details[0].message });
    return;
  }
  let result = await create(req.body);

  res.json(result);
}

async function readeCategory(req, res) {
  let categories = await findCategories();
  if (categories.length) {
    res.json(categories);
    return;
  }
  res.json([]);
}

async function readeOneCategory(req, res) {
  let result = await findCategoryById(req.params.id);
  if (result === null) {
    res.json({ message: "Incorrect id" });
    return;
  }
  res.json(result);
}

async function changeCategory(req, res) {
  let validCat = categoryUpdateValidationSchema.validate(req.body);

  if (validCat.error) {
    res.json({ message: validCat.error.details[0].message });
    return;
  }

  let result = await updateCategory(req.params.id, req.body);

  if (result === null) {
    res.send("There is no row with id");
    return;
  }

  res.json(result);
}

async function deleteCategory(req, res) {
  let result = await removeCategory(req.params.id);
  if (result === null) {
    res.send("There is no category with id");
    return;
  }

  res.json(result);
}

module.exports = {
  createCategory,
  readeCategory,
  readeOneCategory,
  changeCategory,
  deleteCategory,
};
