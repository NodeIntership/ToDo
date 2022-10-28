const express = require("express");

const router = express.Router()

const { createUser, findById } = require("../Controllers/user");


const idParamsValidator = require("../middlewares/id");

router.post("/", createUser);
router.get("/:id", idParamsValidator, findById);

module.exports = router