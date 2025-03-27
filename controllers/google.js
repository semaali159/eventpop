const express = require("express");
const router = express.Router();
const User = require("./models/User"); // استيراد نموذج المستخدم
const jwt = require("jsonwebtoken"); // لإنشاء رمز JWT
const { verifyGoogleToken } = require("./googleAuth"); // وظيفة التحقق من Google
const { OAuth2Client } = require("google-auth-library");
// const User = require("./models/User"); // استيراد نموذج المستخدم

const client = new OAuth2Client("jj"); // ضع Client ID لتطبيقك

async function verifyGoogleToken(idToken) {
  try {
    // تحقق من صحة الرمز باستخدام Google
    const ticket = await client.verifyIdToken({
      idToken,
      audience: "jj",
    });

    const payload = ticket.getPayload(); // بيانات المستخدم من Google
    return payload; // إرجاع البيانات
  } catch (error) {
    throw new Error("Invalid Google ID Token");
  }
}
// Route تسجيل الدخول باستخدام Google
router.post("/auth/google", async (req, res) => {
  const { idToken } = req.body;

  try {
    // التحقق من صحة الرمز
    const payload = await verifyGoogleToken(idToken);

    // البحث عن المستخدم في قاعدة البيانات
    let user = await User.findOne({ where: { email: payload.email } });

    if (!user) {
      // إذا لم يكن موجودًا، قم بإنشائه
      user = await User.create({
        name: payload.name,
        email: payload.email,
        image: payload.picture,
      });
    }

    // إنشاء رمز JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    // إرجاع رمز JWT إلى تطبيق الموبايل
    res.json({ token, user });
  } catch (error) {
    res.status(401).json({ message: "Invalid Google ID Token" });
  }
});

module.exports = router;
