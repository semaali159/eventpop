const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../config/connection");
const Category = sequelize.define("category", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = { Category };
