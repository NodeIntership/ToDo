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

router.post("/", createRow);
router.get("/", readeList);
router.get("/:id", idParamsValidator, readeOne);
router.patch("/:id",idParamsValidator, changeRow);
router.delete("/:id",idParamsValidator, deleteRow);

module.exports = router