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
    userId,
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
      userId,
    };
  },
};

module.exports = RefuelingSerializer;
