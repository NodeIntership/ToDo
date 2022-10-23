const listModel = require("../Models/todoModel");
const catModel = require("../Models/categoriesModel");
const todoValidator = require("../Utils/todoValidation");

async function createRow(req, res) {
  let validRow = todoValidator.validate(req.body);

  if (validRow.error) {
    res.send(validRow.error.details[0].message);
    return;
  }
  let category = await catModel.findOne({ title: req.body.category });
  if (!category) {
    category = new catModel({
      title: req.body.category,
    });
    category.save();
  }

  validRow.value.category = category._id;

  let newRow = new listModel(validRow.value);

  await newRow.save();

  res.send("Ok");
}

async function readeList(req, res) {
  let list = await listModel.find();
  if (list.length) {
    res.json(list);
    return;
  }
  res.send("todo list empty");
}

async function readeOne(req, res) {
  if (!req.query.id) {
    res.send(
      `Please enter ID on the link. example: http://localhost:3000/todo/readone?id=your id`
    );
    return;
  }

  listModel
    .findById(req.query.id)
    .populate("category")
    .exec((e, list) => {
      if (e) {
        console.log(e);
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

  let row = await listModel.findById(id);

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

  let row = await listModel.findByIdAndRemove(req.query.id);

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
};
