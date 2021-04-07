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
      madeAt,
    } = dbSurvivor.get({ plain: true });

    return new Refueling({
      id,
      litres,
      price,
      pricePerLitre,
      totalKilometers,
      dayKilometers,
      fullTank,
      madeAt,
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
      madeAt,
    } = survivor;

    return {
      litres,
      price,
      pricePerLitre,
      totalKilometers,
      dayKilometers,
      fullTank,
      madeAt,
    };
  },
};

module.exports = SequelizeRefuelingMapper;
