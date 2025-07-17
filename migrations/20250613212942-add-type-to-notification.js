"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Notifications", "type", {
      type: Sequelize.ENUM(
        "follow-request",
        "follow-accepted",
        "event-invite",
        "event-accepted",
        "event-rejected"
      ),
      allowNull: false,
      defaultValue: "follow-request", // مؤقتاً إذا أردت تفادي null في الموجودين
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Notifications", "type");
  },
};
