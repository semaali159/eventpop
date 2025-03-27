const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../config/connection");

const userLocation = sequelize.define("userLocation", {
  // id: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   defaultValue: 0,
  //   primaryKey: true,
  // },
});
module.exports = userLocation;
