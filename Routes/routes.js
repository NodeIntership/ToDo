const express = require("express");

const router = express.Router();

const todoRout = require("./todoRout");
const userRout = require("./user.rout");
const categoryRout = require("./categoryRout");

router.use("/todo", todoRout);
router.use("/user", userRout);
router.use("/category", categoryRout);

module.exports = router;
