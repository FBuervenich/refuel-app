const Operation = require('src/app/Operation');

class GetAllRefuelings extends Operation {
  constructor({ refuelingsRepository }) {
    super();
    this.refuelingsRepository = refuelingsRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const refuelings = await this.refuelingsRepository.getAll({
        attributes: [
          'id',
          'litres',
          'price',
          'pricePerLitre',
          'totalKilometers',
          'dayKilometers',
        ],
      });

      this.emit(SUCCESS, refuelings);
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllRefuelings.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllRefuelings;
