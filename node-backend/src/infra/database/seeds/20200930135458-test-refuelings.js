'use strict';

const random = require('random');

module.exports = {
  up: function (queryInterface) {
    const testRefuelings = [];

    for (let i = 0; i < 50; i++) {
      const litres = random.float(0, 100);
      const pricePerLitre = random.float(0.5, 1.5);
      const price = litres * pricePerLitre;

      testRefuelings.push({
        litres,
        price,
        pricePerLitre,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert('refuelings', testRefuelings, {});
  },

  down: function (queryInterface) {
    return queryInterface.bulkDelete('refuelings', null, {});
  },
};
