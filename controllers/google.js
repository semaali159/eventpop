const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config();

const serviceAccountPath = JSON.parse(process.env.FIREBASE_CONFIG_PATH);
// console.log(serviceAccountPath);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
  // databaseURL: "https://signinlasttttttttttttttt.firebaseio.com"
});
// console.log(admin);
router.post("/verify-token", async (req, res) => {
  const { idToken } = req.body;
  console.log("Received ID Token:", idToken);
  const decoded = jwt.decode(idToken, { complete: true });
  console.log("Header:", decoded.header);
  console.log("Payload:", decoded.payload);
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const { uid, email, name } = decodedToken;
    const decoded = jwt.decode(idToken, { complete: true });
    console.log("Header:", decoded.header);
    console.log("Payload:", decoded.payload);
    res.json({
      success: true,
      uid,
      email,
      name: name || "No name provided",
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ success: false, error: error.message });
  }
});
module.exports = router;
