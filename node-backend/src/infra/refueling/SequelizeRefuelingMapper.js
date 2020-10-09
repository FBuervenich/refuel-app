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
    } = dbSurvivor.get({ plain: true });

    return new Refueling({
      id,
      litres,
      price,
      pricePerLitre,
      totalKilometers,
      dayKilometers,
    });
  },

  toDatabase(survivor) {
    const {
      litres,
      price,
      pricePerLitre,
      totalKilometers,
      dayKilometers,
    } = survivor;

    return { litres, price, pricePerLitre, totalKilometers, dayKilometers };
  },
};

module.exports = SequelizeRefuelingMapper;
