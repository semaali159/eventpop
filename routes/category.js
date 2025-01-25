const express = require("express");
const category = require("../controllers/category");
const router = express.Router();
router.post("/", category.createCategory);
router.get("/", category.getAllCategories);
router.get("/:id", category.getCategoryById);
router.put("/:id", category.updatecategory);
router.delete("/:id", category.deleteCategory);
module.exports = router;
