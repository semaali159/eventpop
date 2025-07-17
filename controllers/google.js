const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");
const path = require("path");
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();
// var serviceAccount = require("../tttoootoot-firebase-adminsdk-fbsvc-0fabd895f4.json");
// const serviceAccountPath = JSON.parse(process.env.FIREBASE_CONFIG_PATH);
// console.log(serviceAccountPath);
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   // databaseURL: "https://signinlasttttttttttttttt.firebaseio.com"
// });
// router.post("/verify-token", async (req, res) => {
//   const { idToken } = req.body;

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     return res.status(200).json(decodedToken); // يعيد معلومات المستخدم
//   } catch (error) {
//     console.error("Error verifying token:", error.message);
//     return res.status(401).json({ error: "Invalid or expired token" });
//   }
// });

// console.log(admin);
router.post("/verify-token", async (req, res) => {
  const { idToken } = req.body;

  // console.log("Received ID Token:", idToken);
  const decoded = jwt.decode(idToken, { complete: true });
  // console.log("Header:", decoded.header);
  // console.log("Payload:", decoded.payload);
  const CLIENT_ID =
    "170617762148-1q3f2e7pbavvibh4husqbpu7ghun31o3.apps.googleusercontent.com";
  const client = new OAuth2Client(CLIENT_ID);

  const ticket = await client.verifyIdToken({
    idToken,
    audience: CLIENT_ID,
    maxExpiry: 3600 * 24 * 2, // 48 ساعة // client ID of your app
  });
  const payload = ticket.getPayload();
  return res.status(201).json(payload);
  // });
  // try {
  //   const decodedToken = await admin.auth().verifyIdToken(idToken);

  //   const { uid, email, name } = decodedToken;
  //   const decoded = jwt.decode(idToken, { complete: true });
  //   console.log("Header:", decoded.header);
  //   console.log("Payload:", decoded.payload);
  //   res.json({
  //     success: true,
  //     uid,
  //     email,
  //     name: name || "No name provided",
  //   });
  // } catch (error) {
  //   console.error("Error verifying token:", error);
  //   res.status(401).json({ success: false, error: error.message });
  // }
});
module.exports = router;
