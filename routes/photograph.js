const express = require("express");
const {
  createPhotograph,
  getAllPhotographs,
  getPhotogeaphById,
  updatePhotograph,
} = require("../controllers/photograph");
const router = express.Router();
router.post("/", createPhotograph);
router.get("/", getAllPhotographs);
router.get("/:id", getPhotogeaphById);
router.put("/:id", updatePhotograph);
module.exports = router;
