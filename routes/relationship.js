const express = require("express");
const {
  createRequest,
  accepteRequest,
  rejectRequest,
} = require("../controllers/relationship");
const router = express.Router();
router.post("/", createRequest);
// router.get("/", getAllPhotographs);
// router.get("/:id", getPhotogeaphById);
router.put("/accepte/:id", accepteRequest);
router.put("/reject/:id", rejectRequest);
module.exports = router;
