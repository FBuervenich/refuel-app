import { WithSequelizeTimestamps } from '../../../types/Sequelize';
import { UserCreationAttributes } from '../models/User';
import dataFaker from '../../support/dataFaker';
import { Seed } from '../types';

const seed: Seed = {
  up: async (queryInterface) => {
    const testUsers: WithSequelizeTimestamps<UserCreationAttributes>[] = [];

    for (let i = 0; i < 50; i++) {
      testUsers.push({
        name: dataFaker.name(),
        age: dataFaker.age(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert('users', testUsers, {});
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('users', {}, {});
  },
};

export default seed;
