const user = require("./user");
const locations = require("./locations");
const interest = require("./interest");
const userInterest = require("./userInterest");
const userLocation = require("./userLocation");
const follow = require("./follow");
const publicEvent = require("./publicEvent");
// const notification = require("./notification");
const fcmToken = require("./fcmToken");
const sequelize = require("../config/connection");
const gnoti = require("./gnoti");
const invite = require("./invite");
const attendee = require("./attendee");
const payment = require("./payment");
// Associations
//each user have many public event
user.hasMany(publicEvent, { foreignKey: "userId", onDelete: "CASCADE" });
publicEvent.belongsTo(user, { foreignKey: "userId" });
//each user have many fcm token for notification
user.hasMany(fcmToken, { foreignKey: "userId", onDelete: "CASCADE" });
fcmToken.belongsTo(user, { foreignKey: "userId" });
// // //each user have many notification
//  user.hasMany(gnoti, { foreignKey: "senderId", onDelete: "CASCADE" });
//  notification.belongsTo(user, { foreignKey: "senderId" });
user.hasMany(gnoti, { foreignKey: "userId", onDelete: "CASCADE" });
gnoti.belongsTo(user, { foreignKey: "userId" });
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
user.belongsToMany(publicEvent, {
  through: attendee,
  foreignKey: "userId",
  as: "attendingEvent",
});

publicEvent.belongsToMany(user, {
  through: attendee,
  foreignKey: "publicEventId",
  as: "attendees",
});
user.belongsToMany(publicEvent, {
  through: invite,
  foreignKey: "userId",
  as: "invitedEvent",
});

publicEvent.belongsToMany(user, {
  through: invite,
  foreignKey: "publicEventId",
  as: "invitedEvent",
});
attendee.hasOne(payment);
payment.belongsTo(attendee);
module.exports = {
  user,
  interest,
  sequelize,
  userInterest,
  userLocation,
  locations,
  follow,
  // notification,
  fcmToken,
  publicEvent,
  gnoti,
  invite,
  attendee,
};
