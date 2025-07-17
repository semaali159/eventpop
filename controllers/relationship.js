const asyncHandler = require("express-async-handler");
const db = require("../model");
const sendNotification = require("../utils/sendNotification");
const sequelize = require("../config/connection");
const { Op } = require("sequelize");

const createRequest = asyncHandler(async (req, res) => {
  const { followingId, followerId } = req.body;

  if (!followerId || !followingId) {
    return res
      .status(400)
      .json({ message: "Missing followerId or followingId." });
  }

  const user1 = await db.user.findOne({ where: { id: followingId } });
  const user2 = await db.user.findOne({ where: { id: followerId } });

  if (!user1 || !user2) {
    return res.status(404).json({ message: "User not found." });
  }

  const followRequest = await db.follow.findOne({
    where: { followerId, followingId },
  });

  if (followRequest) {
    return res.status(400).json({ message: "Request already sent!" });
  }

  await db.follow.create({ followingId, followerId });

  const title = `Follow Request`;
  const body = `${user2.name} sent you a follow request`;
  token =
    "cRy7L3FjSpaug1TizFNbT6:APA91bG40uqOvwVdB2PGJ0LK14QdLaVhpREDhxdX3Sns48nNXyJG7ztoul-R7Qvmjke8UBbR26CuXuD7-iTt-DLF8wxdsfPWY7wKb3BtN-eaoS-fdp_9nL4";
  const mo = await db.gnoti.create({
    userId: user1.id,
    type: "follow-request",
    message: `${user2.name} sent you a follow request`,
  });
  console.log(mo);

  const success = await sendNotification(token, title, body);

  // if (Array.isArray(user1.fcmToken)) {
  //   for (const token of user1.fcmToken) {
  //     const success = await sendNotification(token, title, body);
  //     if (success) {
  //       console.log("Notification sent to token:", token);
  //     }
  //   }
  // }

  return res.status(201).json({ message: "Request sent successfully." });
});

const accepteRequest = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const request = await db.relations.findByPk(id);

  if (!request) {
    return res.status(404).json({ message: "Request not found." });
  }

  await db.relations.update({ status: "accepted" }, { where: { id } });

  const user1 = await db.user.findOne({ where: { id: request.followingId } });
  const user2 = await db.user.findOne({ where: { id: request.followerId } });

  await db.notification.create(
    {
      userId: user2.id,
      type: "follow-accepted",
      message: `${user1.name} accepted your follow request`,
      senderId: user1.id,
      sourceType: "follow",
      sourceId: request.id,
    },
    { transaction: t }
  );

  const title = `Follow Request Accepted`;
  const body = `${user1.name} accepted your follow request`;
  await t.commit();

  if (user2.fcmTokens?.length) {
    for (const tokenObj of user2.fcmTokens) {
      console.log(tokenObj.fcmToken);
      await sendNotification(tokenObj.fcmToken, title, body);
    }
  }

  return res.status(200).json({ message: "Request accepted successfully." });
});

// const accepteRequest = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   const request = await db.follow.findByPk(id);

//   if (!request) {
//     return res.status(404).json({ message: "Request not found." });
//   }

//   await db.follow.update({ status: "accepted" }, { where: { id } });

//   const user1 = await db.user.findOne({ where: { id: request.followingId } });
//   const user2 = await db.user.findOne({ where: { id: request.followerId } });

//   const title = `Follow Request Accepted`;
//   const body = `${user1.name} accepted your follow request`;

//   // if (Array.isArray(user2.fcmToken)) {
//   //   for (const token of user2.fcmToken) {
//   //     const success = await sendNotification(token, title, body);
//   //     if (success) {
//   //       console.log("Notification sent to token:", token);
//   //     }
//   //   }
//   // }
//   console.log(body);

//   token =
//     "cFv79hF_RSKlHuGFvFVfUe:APA91bErOhrt93-tnItm-mt2sdhrqMQPJafRw_zfIgelWVbskXDjjJKbxLTvHe1b5PCjIupEWYgErnjCvfANKgGqkhlWr1AWhMlHCIyPsZgy5FcOKXWwVm0";
//   const mo = await db.gnoti.create({
//     userId: user2.id,
//     type: "follow-accepted",
//     message: `${user1.name} accepted your follow request`,
//   });
//   console.log(mo);

//   const success = await sendNotification(token, title, body);

//   return res.status(200).json({ message: "Request accepted successfully." });
// });

const rejectRequest = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const request = await db.follow.findByPk(id);

  if (!request) {
    return res.status(404).json({ message: "Request not found." });
  }

  await db.follow.update({ status: "rejected" }, { where: { id } });

  return res.status(200).json({ message: "Request rejected successfully." });
});
const getAllFollowers = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const followers = await db.follow.findAll({
    where: { followingId: id },
    attributes: ["followerId"],
  });
  const followerIds = followers.map((f) => f.followerId);
  const existFollowers = await db.user.findAll({
    where: { id: { [Op.in]: followerIds } },
    attributes: [
      "id",
      "name",
      "image",
      sequelize.literal(`(
            SELECT COUNT(*)
            FROM follows AS follow
            WHERE follow."followingId" = "user"."id"
          )`),
    ],
  });

  if (!existFollowers || existFollowers.length === 0) {
    return res.status(404).json({ message: "you don't have any follower" });
  }
  return res.status(200).json({ message: "your followers ", existFollowers });
});
module.exports = {
  createRequest,
  accepteRequest,
  rejectRequest,
  getAllFollowers,
};
