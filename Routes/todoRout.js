const express = require("express");

const router = express.Router()

const {
  createRow,
  readeList,
  readeOne,
  changeRow,
  deleteRow,
} = require("../Controllers/todo");

const idParamsValidator = require("../middlewares/id");
const queryValidator = require("../middlewares/query")

router.post("/", createRow);
router.get("/", queryValidator, readeList);
router.get("/:id", idParamsValidator, readeOne);
router.patch("/:id",idParamsValidator, changeRow);
router.delete("/:id",idParamsValidator, deleteRow);

module.exports = router