'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('refuelings', 'totalKilometers', {
        allowNull: true,
        type: Sequelize.FLOAT,
      }),
      queryInterface.addColumn('refuelings', 'fullTank', {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      }),
    ]);
  },
  down: function (queryInterface) {
    // return queryInterface.dropTable('refuelings');

    return Promise.all([
      queryInterface.removeColumn('refuelings', 'totalKilometers'),
      queryInterface.removeColumn('refuelings', 'fullTank'),
    ]);
  },
};
