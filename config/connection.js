// //development
// const { Sequelize } = require("sequelize");
// require("dotenv").config();
// const sequelize = new Sequelize(
//   process.env.DATABASE_NAME,
//   process.env.DATABASE_USERNAME,
//   process.env.DATABASE_PASSWORD,
//   {
//     host: "localhost",
//     dialect: "postgres",
//   }
// );

// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log(
//       "Connection to the database has been established successfully."
//     );
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// })();

// module.exports = sequelize;

// production;
const { Sequelize } = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(process.env.NEON, {
  // const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
