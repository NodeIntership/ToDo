const express = require("express");

const router = express.Router();

const todoRout = require("./todoRout");
const categoryRout = require("./categoryRout");

router.use("/todo", todoRout);
router.use("/category", categoryRout);

module.exports = router;
