const express = require("express");
const { inviteFrind } = require("../controllers/inviteRequest");
const { verifyTokenAndUser, verifyToken } = require("../utils/verifyToken");

const router = express.Router();
router.get("/inviteFriend/:id", verifyToken, inviteFrind);
// router.get("/:id", getProfile);
module.exports = router;
