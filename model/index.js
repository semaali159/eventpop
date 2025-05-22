const user = require("./user");
const locations = require("./locations");
const interest = require("./interest");
const userInterest = require("./userInterest");
const userLocation = require("./userLocation");
const follow = require("./follow");
const publicEvent = require("./publicEvent");
const notification = require("./notification");
const fcmToken = require("./fcmToken");
const sequelize = require("../config/connection");

// Associations
//each user have many public event
user.hasMany(publicEvent, { foreignKey: "userId", onDelete: "CASCADE" });
publicEvent.belongsTo(user, { foreignKey: "userId" });
//each user have many fcm token for notification
user.hasMany(fcmToken, { foreignKey: "userId", onDelete: "CASCADE" });
fcmToken.belongsTo(user, { foreignKey: "userId" });
//each user have many notification
user.hasMany(notification, { foreignKey: "userId", onDelete: "CASCADE" });
notification.belongsTo(user, { foreignKey: "userId" });
//users have many interests and interests belongs to many users
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
// users have many locations
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
//users can follow each other
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
  fcmToken,
  publicEvent,
};
