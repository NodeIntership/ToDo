const express = require("express");

const router = express.Router()

const {
  createRow,
  readeList,
  readeOne,
  changeRow,
  deleteRow,
} = require("../Controllers/todo");

router.post("/create", createRow);
router.get("/readAll", readeList);
router.get("/readOne", readeOne);
router.patch("/change", changeRow);
router.delete("/remove", deleteRow);

module.exports = router