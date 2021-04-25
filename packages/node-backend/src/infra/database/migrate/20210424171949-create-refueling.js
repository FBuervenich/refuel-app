'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('refuelings', 'userId', {
      allowNull: false,
      type: Sequelize.STRING,
      defaultValue: 'NONE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('refuelings', 'userId');
  },
};
