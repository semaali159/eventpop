const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../config/connection");
const fcmToken = sequelize.define("fcmToken", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = fcmToken;
