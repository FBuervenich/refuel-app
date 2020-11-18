const RefuelingSerializer = {
  serialize({
    id,
    litres,
    price,
    pricePerLitre,
    totalKilometers,
    dayKilometers,
    fullTank,
  }) {
    return {
      id,
      litres,
      price,
      pricePerLitre,
      totalKilometers,
      dayKilometers,
      fullTank,
    };
  },
};

module.exports = RefuelingSerializer;
