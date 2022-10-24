const todoModel = require("../Models/todoModel");
const catModel = require("../Models/categoriesModel");
const todoValidator = require("../Validations/todoValidation");

async function createRow(req, res) {
  let validRow = todoValidator.validate(req.body);

  if (validRow.error) {
    res.send(validRow.error.details[0].message);
    return;
  }
  let category = await catModel.findById(req.body.categoryId);
  
  if(!category){
    res.send("category not found");
    return;
  }

  validRow.value.category = category._id;

  let newRow = new todoModel(validRow.value);

  await newRow.save();

  res.send("Ok");
}

async function readeList(req, res) {
  let list = await todoModel.find();
  if (list.length) {
    res.json(list);
    return;
  }
  res.send("todo list empty");
}

async function readOnCategory(req, res){
  let cat = await todoModel.find({category: req.query.id});
  if(!cat){
    res.send("Not category found")
  }
  res.json(cat)
}

async function readeOne(req, res) {
  if (!req.query.id) {
    res.send(
      `Please enter ID on the link. example: http://localhost:3000/todo/readone?id=your id`
    );
    return;
  }

  todoModel
    .findById(req.query.id)
    .populate("category")
    .exec((e, list) => {
      if (e) {
        res.send(e.message);
        return;
      }
      res.send(list);
    });
}

async function changeRow(req, res) {
  if (!req.body) {
    res.send("please fill in both fields");
    return;
  }
  let { id, description } = req.body;

  let row = await todoModel.findById(id);

  if (!row) {
    res.send("There is no row with id");
    return;
  }
  row.description = description;

  await row.save();

  res.send("Ok");
}

async function deleteRow(req, res) {
  if (!req.query.id) {
    res.send(
      `Please enter ID on the link. example: http://localhost:3000/todo/remove?id=your id`
    );
    return;
  }

  let row = await todoModel.findByIdAndRemove(req.query.id);

  if (!row) {
    res.send("There is no row with id");
    return;
  }

  res.json("Row removed");
}

module.exports = {
  createRow,
  readeList,
  readeOne,
  changeRow,
  deleteRow,
  readOnCategory,
};
