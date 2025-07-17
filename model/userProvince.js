const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../config/connection");

const userProvince = sequelize.define("userProvince", {});
module.exports = userProvince;
