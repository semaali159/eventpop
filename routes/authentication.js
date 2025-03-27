const express = require("express");
const auth = require("../controllers/authentication");
const router = express.Router();
router.post("/admin/register", auth.adminRegister);
router.post("/register", auth.register);
router.post("/verification", auth.Verification);
router.post("/login", auth.Login);
// router.get("/", category.getAllCategories);

// router.put("/:id", category.updatecategory);
// router.delete("/:id", category.deleteCategory);
module.exports = router;
