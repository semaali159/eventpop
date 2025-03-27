const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../config/connection");
const follow = sequelize.define("follow", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  followerId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  followingId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  status: {
    type: DataTypes.ENUM("pending", "accepted", "rejected"),
    allowNull: false,
    defaultValue: "pending",
  },
});
module.exports = { follow };
