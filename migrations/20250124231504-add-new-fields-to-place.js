"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("places", "location", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("places", "maxCapacity", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("places", "minCapacity", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("places", "price", {
      type: Sequelize.FLOAT,
      allowNull: true,
    });
    await queryInterface.addColumn("places", "description", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("places", "maxCapacity");
    await queryInterface.removeColumn("places", "minCapacity");
    await queryInterface.removeColumn("places", "price");
    await queryInterface.removeColumn("places", "description");
  },
};
