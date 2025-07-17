const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/profile");
const { getAllFollowers } = require("../controllers/relationship");
router.get("/follower/:id", getAllFollowers);
router.get("/:id", getProfile);
module.exports = router;
