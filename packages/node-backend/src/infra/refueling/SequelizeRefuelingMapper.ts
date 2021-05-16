import Refueling from '../../domain/refueling/Refueling';

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
      userId,
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
      userId,
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
      userId,
    } = survivor;

    return {
      litres,
      price,
      pricePerLitre,
      totalKilometers,
      dayKilometers,
      fullTank,
      madeAt,
      userId,
    };
  },
};

export default SequelizeRefuelingMapper;
