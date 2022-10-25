const todoValidator = require("../Validations/todoValidation");
const {
  create,
  findMeny,
  findRowById,
  updateRow,
  removeRow,
} = require("../Models/todoModel");

async function createRow(req, res) {
  let validRow = todoValidator.validate(req.body);

  if (validRow.error) {
    res.json({ message: validRow.error.details[0].message });
    return;
  }

  let result = await create(validRow.value);

  if (result === null) {
    res.json({ message: "category not found" });
    return;
  }

  res.json(result);
}

async function readeList(req, res) {
  let result = await findMeny();
  if (result.length) {
    res.json(result);
    return;
  }
  res.json([]);
}

async function readeOne(req, res) {
  let result = await findRowById(req.params.id);
  if (result === null) {
    res.json({ message: "Incorrect id" });
    return;
  }
  res.json(result);
}

async function changeRow(req, res) {
  if (!req.body) {
    res.send("please fill in both fields");
    return;
  }

  let result = await updateRow(req.params.id, req.body);

  if (result === null) {
    res.send("There is no row with id");
    return;
  }

  res.json(result);
}

async function deleteRow(req, res) {
  let result = await removeRow(req.params.id);
  if (result === null) {
    res.send("There is no row with id");
    return;
  }

  res.json(result);
}

module.exports = {
  createRow,
  readeList,
  readeOne,
  changeRow,
  deleteRow,
};
