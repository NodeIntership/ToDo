const express = require("express");

const router = express.Router();

const {
  createCategory,
  readeCategory,
  readeOneCategory,
  changeCategory,
  deleteCategory,
} = require("../Controllers/categories");

router.post("/create", createCategory);
router.get("/readAll", readeCategory);
router.get("/readOne", readeOneCategory);
router.patch("/change", changeCategory);
router.delete("/remove", deleteCategory);

module.exports = router;
