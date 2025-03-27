const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../config/connection");

const UserInterest = sequelize.define("userInterest", {
  // id: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   defaultValue: 0,
  //   primaryKey: true,
  // },
});
module.exports = UserInterest;
