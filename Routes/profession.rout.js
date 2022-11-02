const express = require("express");

const router = express.Router();

const idParamsValidator = require("../middlewares/id");

const { createProfession, findById, findProfessions } = require("../Controllers/profession");

router.post("/", createProfession);
router.get("/", findProfessions);
router.get("/:id", idParamsValidator, findById);

module.exports = router;
