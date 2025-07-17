const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../config/connection");

const attendee = sequelize.define("attendee", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    primaryKey: true,
  },
  seats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
module.exports = attendee;
