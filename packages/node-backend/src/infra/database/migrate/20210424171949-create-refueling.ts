import Sequelize, { QueryInterface } from 'sequelize';
import { Migration } from '../types';

const migration: Migration = {
  up: async queryInterface => {
    await queryInterface.addColumn('refuelings', 'userId', {
      allowNull: false,
      type: Sequelize.STRING,
      defaultValue: 'NONE',
    });
  },

  down: async queryInterface => {
    await queryInterface.removeColumn('refuelings', 'userId');
  },
};

export default migration;
