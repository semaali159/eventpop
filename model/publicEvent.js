const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../config/connection");
const publicEvent = sequelize.define("publicEvent", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  laitude: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  price: { type: DataTypes.FLOAT, allowNull: false },
  tickets: { type: DataTypes.INTEGER, allowNull: false },
});
module.exports = publicEvent;
