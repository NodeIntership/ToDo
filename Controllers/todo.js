const todoValidator = require("../Validations/todoValidation");
const { todoUpdateValidationSchema } = require("../Validations/update.validation")
const {
  create,
  findMany,
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

  create(req.body)
    .then(result => {
      res.json(result);
    })
    .catch(e => {
      if(e.message === "category"){
        res.json({message: "category not found"})
        return 
      } else if(e.message === "user"){
        res.json({ message: "user not found" });
        return; 
      }
    })
}

async function readeList(req, res) {
  let result = await findMany(req.query);
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

  let validRow = todoUpdateValidationSchema.validate(req.body);

  if (validRow.error) {
    res.json({ message: validRow.error.details[0].message });
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
