import Sequelize from 'sequelize';
import { Migration } from '../types';

const migration: Migration = {
  up: function(queryInterface) {
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
  down: function(queryInterface) {
    return queryInterface.dropTable('refuelings');
  },
};

export default migration;
