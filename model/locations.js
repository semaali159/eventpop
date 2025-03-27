const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../config/connection");
const Location = sequelize.define("location", {
  id: {
    type: DataTypes.UUID, // النوع الصحيح للحقل هو UUID
    defaultValue: DataTypes.UUIDV4, // توليد القيم تلقائيًا باستخدام UUIDV4
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
