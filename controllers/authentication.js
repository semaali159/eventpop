const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../model");
const asynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { validateRegister, validateLogin } = require("../utils/validate");
const { generateRandomNumber, generateToken } = require("../utils/generateOTP");
const sendEmail = require("../utils/sendEmail");
const sequelize = require("../config/connection");
const register = asynchandler(async (req, res) => {
  const { error } = validateRegister(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, email, password, locations, interests, phoneNumber } = req.body;

  let user = await db.user.findOne({ where: { email } });
  if (user) {
    return res
      .status(400)
      .json({ message: "Email already exists, please login" });
  }
  console.log(user);
  console.log(name);

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = generateRandomNumber(1000, 9999);

  try {
    await sendEmail(email, otp);
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .json({ message: "Failed to send verification email" });
  }
  const t = await sequelize.transaction();

  try {
    user = await db.user.create(
      {
        name,
        email,
        password: hashedPassword,
        isAdmin: false,
        phoneNumber,
        otpNum: otp,
      },
      { transaction: t }
    );

    if (interests && interests.length > 0) {
      const interestPromises = interests.map(async (interest) => {
        const existInterest = await db.interest.findOne(
          { where: { name: interest } },
          { transaction: t }
        );
        console.log(existInterest);
        if (existInterest) {
          await db.userInterest.create(
            {
              userId: user.id,
              interestId: existInterest.id,
            },
            { transaction: t }
          );
        }
      });

      await Promise.all(interestPromises);
    }

    if (locations && locations.length > 0) {
      const locationPromises = locations.map(async (location) => {
        const { laitude, longitude } = location;

        let existLocation = await db.locations.findOne(
          {
            where: { laitude, longitude },
          },
          { transaction: t }
        );

        if (!existLocation) {
          existLocation = await db.locations.create(
            {
              laitude,
              longitude,
            },
            { transaction: t }
          );
        }

        await db.userLocation.create(
          {
            userId: user.id,
            locationId: existLocation.id,
          },
          { transaction: t }
        );
      });

      await Promise.all(locationPromises);
    }

    await t.commit();
    return res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    await t.rollback();
    console.error("Error during user registration:", error);
    return res
      .status(500)
      .json({ message: "An error occurred during registration." });
  }
});

// cheack if the location is in the tabele (link) else (added to location and userlocation )
const adminRegister = asynchandler(async (req, res) => {
  const { error } = validateRegister(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, email, password, phoneNumber } = req.body;

  let user = await db.user.findOne({ where: { email } });
  if (user) {
    return res
      .status(400)
      .json({ message: "Email already exists, please verify your email" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const otp = generateRandomNumber(1000, 9999);

  try {
    await sendEmail(email, otp);
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .json({ message: "Failed to send verification email" });
  }

  const t = await sequelize.transaction();
  try {
    user = await db.user.create(
      {
        name,
        email,
        password: hashedPassword,
        isAdmin: true,
        phoneNumber,
        otpNum: otp,
      },
      { transaction: t }
    );

    await t.commit();

    return res.status(201).json({
      message: "Registered successfully. Please verify your email.",
    });
  } catch (error) {
    await t.rollback();
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Unexpected error occurred" });
  }
});
const Verification = asynchandler(async (req, res) => {
  const { email, otpNum } = req.body;
  const user = await db.user.findOne({ where: { email } });
  if (!user) {
    return res
      .status(404)
      .json({ message: "Email not found, please register" });
  }
  if (!otpNum == user.otpNum) {
    return res
      .status(400)
      .json({ message: "Verification faild, please try again!" });
  }
  const [updateRows] = await db.user.update(
    { isVerified: true },
    {
      where: { id: user.id },
    }
  );

  return res
    .status(200)
    .json({ message: "Verification successfully. please login" });
});
const Login = asynchandler(async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { email, password, fcmToken } = req.body;
  const user = await db.user.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({ message: "invalid email or password" });
  }

  if (!user.isVerified) {
    return res
      .status(400)
      .json({ message: "Verification faild. please verify your email " });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "invalid email or password" });
  }
  if (fcmToken && typeof fcmToken === "string") {
    const existToken = await db.fcmToken.findOne({
      where: { token: fcmToken },
    });
    if (!existToken) {
      const newToken = await db.fcmToken.create({
        token: fcmToken,
        userId: user.id,
      });
    }
  }
  const token = generateToken(user.id, user.isAdmin);
  return res.status(200).json({ message: "login successfully", token });
});
module.exports = { adminRegister, Verification, Login, register };
