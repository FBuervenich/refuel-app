const RefuelingSerializer = {
  serialize({
    id,
    litres,
    price,
    pricePerLitre,
    totalKilometers,
    dayKilometers,
    fullTank,
    madeAt,
  }) {
    return {
      id,
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

module.exports = RefuelingSerializer;
