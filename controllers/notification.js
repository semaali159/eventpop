const { not } = require("joi");
const db = require("../model");
const asyncHandler = require("express-async-handler");
const getAllNotification = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const notifications = await db.notification.findAll({ where: userId });
  if (!notifications) {
    return res.status(404).json({ message: "there is not notification" });
  }
  return res.status(200).json({ message: "notifications:", notifications });
});
module.exports = { getAllNotification };
