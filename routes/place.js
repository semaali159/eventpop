const express = require("express");
const {
  createPlace,
  getAllPlaces,
  getPlaceById,
  updatePlace,
  deletePlace,
} = require("../controllers/place");
const router = express.Router();
router.post("/", createPlace);
router.get("/", getAllPlaces);
router.get("/:id", getPlaceById);
router.put("/:id", updatePlace);
router.delete("/:id", deletePlace);
module.exports = router;
