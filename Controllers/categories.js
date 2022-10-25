const {
  create,
  findMeny,
  findCategoryById,
  updateCategory,
  removeCategory,
} = require("../Models/categoriesModel");
const categoryValidation = require("../Validations/category.validation");

async function createCategory(req, res) {
  let validTitle = categoryValidation.validate(req.body);
  if (validTitle.error) {
    res.json({ message: validTitle.error.details[0].message });
    return;
  }
  let result = await create();

  res.json(result);
}

async function readeCategory(req, res) {
  let categories = await findMeny();
  if (result.length) {
    res.json(result);
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
  if (!req.body) {
    res.send("please fill in both fields");
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
