const user = require("./user");
const locations = require("./locations");
const interest = require("./interest");
const userInterest = require("./userInterest");
const userLocation = require("./userLocation");
const follow = require("./follow");
const publicEvent = require("./publicEvent");
const notification = require("./notification");
const sequelize = require("../config/connection");

// Associations
user.hasMany(publicEvent, { foreignKey: "userId", onDelete: "CASCADE" });
publicEvent.belongsTo(user, { foreignKey: "userId" });
user.hasMany(notification, { foreignKey: "userId", onDelete: "CASCADE" });
notification.belongsTo(user, { foreignKey: "userId" });

user.belongsToMany(interest, {
  through: userInterest,
  foreignKey: "userId",
  as: "interests",
});

interest.belongsToMany(user, {
  through: userInterest,
  foreignKey: "interestId",
  as: "users",
});
user.belongsToMany(locations, {
  through: userLocation,
  foreignKey: "userId",
  as: "locations",
});

locations.belongsToMany(user, {
  through: userLocation,
  foreignKey: "locationId",
  as: "users",
});
user.belongsToMany(user, {
  through: follow,
  as: "followers",
  foreignKey: "followingId",
  otherKey: "followerId",
});
user.belongsToMany(user, {
  through: follow,
  as: "following",
  foreignKey: "followerId",
  otherKey: "followingId",
});
module.exports = {
  user,
  interest,
  sequelize,
  userInterest,
  userLocation,
  locations,
  follow,
  notification,
};
