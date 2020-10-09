'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('refuelings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      litres: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      price: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      pricePerLitre: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      totalKilometers: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      dayKilometers: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: function (queryInterface) {
    return queryInterface.dropTable('refuelings');
  },
};
