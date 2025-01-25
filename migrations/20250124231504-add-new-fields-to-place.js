"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("places", "location", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("places", "maxCapacity", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.addColumn("places", "minCapacity", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.addColumn("places", "price", {
      type: Sequelize.FLOAT,
      allowNull: false,
    });
    await queryInterface.addColumn("places", "description", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // حذف الحقول في حالة التراجع
    await queryInterface.removeColumn("places", "location");
    await queryInterface.removeColumn("places", "maxCapacity");
    await queryInterface.removeColumn("places", "minCapacity");
    await queryInterface.removeColumn("places", "price");
    await queryInterface.removeColumn("places", "description");
  },
};
