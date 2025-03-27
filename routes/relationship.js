const express = require("express");
const {
  createRequest,
  accepteRequest,
  rejectRequest,
} = require("../controllers/relationship");
const router = express.Router();
router.post("/", createPhotograph);
router.get("/", getAllPhotographs);
router.get("/:id", getPhotogeaphById);
router.put("/:id", updatePhotograph);
module.exports = router;
