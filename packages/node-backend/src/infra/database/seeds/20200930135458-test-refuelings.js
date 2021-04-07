'use strict';

const random = require('random');

module.exports = {
  up: function (queryInterface) {
    // maximum amount of deviation from the curre
    const maxTimeDeviationFromCurrentInSeconds = 60 * 60 * 24 * 365; // 1 year max. deviation
    const currentDate = new Date();

    const testRefuelings = [];

    for (let i = 0; i < 50; i++) {
      const litres = random.float(0, 100);
      const pricePerLitre = random.float(0.5, 1.5);
      const price = litres * pricePerLitre;
      const fullTank = random.boolean();
      const totalKilometers = 50000 + random.int(1000, 200000);
      const dayKilometers = random.int(50, 1000);

      const timeDeviation = random.int(0, maxTimeDeviationFromCurrentInSeconds);
      let madeAt = new Date(currentDate);
      madeAt.setSeconds(madeAt.getSeconds() - timeDeviation);

      testRefuelings.push({
        litres,
        price,
        pricePerLitre,
        fullTank,
        totalKilometers,
        dayKilometers,
        madeAt,
        createdAt: currentDate,
        updatedAt: currentDate,
      });
    }

    return queryInterface.bulkInsert('refuelings', testRefuelings, {});
  },

  down: function (queryInterface) {
    return queryInterface.bulkDelete('refuelings', null, {});
  },
};
