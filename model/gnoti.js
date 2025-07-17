const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

const gnoti = sequelize.define(
  "gnoti",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    type: {
      type: DataTypes.ENUM(
        "follow-request",
        "follow-accepted",
        //follow reject
        "event-invite",
        "event-accepted",
        "event-rejected"
      ),
      allowNull: false,
      defaultValue: "follow-request",
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = gnoti;
