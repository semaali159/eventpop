const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");

// تهيئة Firebase Admin SDK
const serviceAccount = require("../signinlasttttttttttttttt-firebase-adminsdk-fbsvc-2722b4cead.json");

// أضف هذا للتحقق من أن معرّف المشروع صحيح
console.log("المشروع المحدد:", serviceAccount.project_id);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // أضف هذا للتأكد من استخدام نفس معرّف المشروع
  databaseURL: "https://signinlasttttttttttttttt.firebaseio.com",
});
console.log(admin);
router.post("/verify-token", async (req, res) => {
  const { idToken } = req.body;
  console.log("Received ID Token:", idToken);
  const decoded = jwt.decode(idToken, { complete: true });
  console.log("Header:", decoded.header);
  console.log("Payload:", decoded.payload);
  try {
    // تحقق من صلاحية الـ idToken
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
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
