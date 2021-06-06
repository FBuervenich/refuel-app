import { Refueling } from '@ra/common/dist/interfaces/types/Refueling.schema';
import { RefuelingModelType } from '../database/models/Refueling';

const SequelizeRefuelingMapper = {
  toEntity(dbSurvivor: RefuelingModelType) {
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

    const refueling: Refueling = {
      id,
      litres,
      price,
      pricePerLitre,
      totalKilometers,
      dayKilometers,
      fullTank,
      madeAt,
      userId,
    };
    return refueling;
  },

  toDatabase(survivor: Refueling) {
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
