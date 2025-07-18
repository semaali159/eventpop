const db = require("../model");
const asyncHandler = require("express-async-handler");
const sendNotification = require("../utils/sendNotification");
//   if(existUser.length==0){
//     return res.status(404).json({ message: "you haven't frinds" });
//   }
const { sequelize } = require("../model");

const inviteFrind = asyncHandler(async (req, res) => {
  const organizerId = req.user.id;
  const pid = req.params;
  const { followers } = req.body;

  if (!Array.isArray(followers) || followers.length === 0) {
    return res.status(400).json({ message: "no followers" });
  }

  const event = await db.publicEvent.findByPk(pid.id, {
    attributes: ["id", "userId"],
  });

  if (!event || organizerId !== event.userId) {
    return res.status(400).json({ message: "not allowed" });
  }

  const organizer = await db.user.findByPk(organizerId);

  const transaction = await sequelize.transaction();

  try {
    await Promise.all(
      followers.map(async (follow) => {
        const alreadyInvited = await db.invite.findOne({
          where: { userId: follow, publicEventId: pid.id },
          transaction,
        });

        if (alreadyInvited) return;

        await db.invite.create(
          { userId: follow, publicEventId: pid.id },
          { transaction }
        );

        await db.gnoti.create(
          {
            userId: follow,
            type: "event-invite",
            message: `${organizer.name} invite you to an event`,
            isRead: false,
          },
          { transaction }
        );
      })
    );

    await transaction.commit();

    followers.forEach((follow) => {
      const token = " ";
      if (token) {
        sendNotification(
          token,
          "Event Invite",
          `${organizer.name} invited you to an event`
        );
      }
    });

    return res.status(200).json({ message: "success" });
  } catch (error) {
    await transaction.rollback();
    console.error("Transaction error:", error);
    return res.status(500).json({ message: "Failed to invite followers" });
  }
});
// const accepteInvite = asyncHandler(async (req, res) => {
//   const iid = req.body;
// });
module.exports = { inviteFrind };
