const asyncHandler = require("express-async-handler");
const db = require("../model");
const sequelize = require("../config/connection");

const getProfile = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const userProfile = await db.user.findOne({
    where: {
      id: userId,
    },
    attributes: {
      include: [
        [
          sequelize.literal(`(
            SELECT COUNT(*)
            FROM follows AS follow
            WHERE follow."followingId" = "user"."id"
          )`),
          "followersCount",
        ],
        [
          sequelize.literal(`(
            SELECT COUNT(*)
            FROM follows AS follow
            WHERE follow."followerId" = "user"."id"
          )`),
          "followingCount",
        ],
      ],
    },
    include: [
      {
        model: db.interest,
        as: "interests",
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    ],
  });
  if (!userProfile) {
    return res.status(404).json({ message: "user not found" });
  }
  return res.status(200).json(userProfile);
});
module.exports = { getProfile };
