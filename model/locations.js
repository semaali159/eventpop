const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../config/connection");
const Location = sequelize.define("location", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  laitude: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});
module.exports = Location;
