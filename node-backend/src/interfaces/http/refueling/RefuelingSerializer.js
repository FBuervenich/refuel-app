const RefuelingSerializer = {
  serialize({
    id,
    litres,
    price,
    pricePerLitre,
    totalKilometers,
    dayKilometers,
  }) {
    return {
      id,
      litres,
      price,
      pricePerLitre,
      totalKilometers,
      dayKilometers,
    };
  },
};

module.exports = RefuelingSerializer;
