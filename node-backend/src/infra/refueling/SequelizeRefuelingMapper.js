const Refueling = require('src/domain/refueling/Refueling');

const SequelizeRefuelingMapper = {
  toEntity(dbSurvivor) {
    const {
      id,
      litres,
      price,
      pricePerLitre,
      totalKilometers,
      dayKilometers,
      fullTank,
    } = dbSurvivor.get({ plain: true });

    return new Refueling({
      id,
      litres,
      price,
      pricePerLitre,
      totalKilometers,
      dayKilometers,
      fullTank,
    });
  },

  toDatabase(survivor) {
    const {
      litres,
      price,
      pricePerLitre,
      totalKilometers,
      dayKilometers,
      fullTank,
    } = survivor;

    return {
      litres,
      price,
      pricePerLitre,
      totalKilometers,
      dayKilometers,
      fullTank,
    };
  },
};

module.exports = SequelizeRefuelingMapper;
