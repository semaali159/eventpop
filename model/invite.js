const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../config/connection");

const invite = sequelize.define("invite", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
module.exports = invite;
