import dataFaker from '../../support/dataFaker';
import { Seed } from '../types';

const seed: Seed = {
  up: async queryInterface => {
    const testUsers = [];

    for (let i = 0; i < 50; i++) {
      testUsers.push({
        name: dataFaker.name(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert('users', testUsers, {});
  },

  down: async queryInterface => {
    return queryInterface.bulkDelete('users', null, {});
  },
};

export default seed;
