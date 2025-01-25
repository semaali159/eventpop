// const { DataTypes, INTEGER } = require("sequelize");
// const sequelize = require("../config/connection");
// const place = sequelize.define("place", {
//   id: {
//     type: DataTypes.UUID,
//     // type: DataTypes.INTEGER,
//     defaultValue: DataTypes.UUIDV1,
//     allowNull: false,
//     primaryKey: true,
//   },
//   image: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   phoneNumber: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
// });
// module.exports = place;
const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

const place = sequelize.define("place", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    allowNull: false,
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
  phoneNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  maxCapacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  minCapacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = place;
