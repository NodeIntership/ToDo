const express = require("express");

const router = express.Router();

const {
  createCategory,
  readeCategory,
  readeOneCategory,
  changeCategory,
  deleteCategory,
} = require("../Controllers/categories");

const idParamsValidator = require("../middlewares/id");

router.post("/", createCategory);
router.get("/", readeCategory);
router.get("/:id", idParamsValidator, readeOneCategory);
router.patch("/:id",idParamsValidator, changeCategory);
router.delete("/:id",idParamsValidator, deleteCategory);

module.exports = router;
