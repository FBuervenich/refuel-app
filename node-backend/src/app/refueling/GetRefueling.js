const Operation = require('src/app/Operation');

class GetRefueling extends Operation {
  constructor({ refuelingsRepository }) {
    super();
    this.refuelingsRepository = refuelingsRepository;
  }

  async execute(refuelingId) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {
      const refueling = await this.refuelingsRepository.getById(refuelingId);
      this.emit(SUCCESS, refueling);
    } catch (error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details,
      });
    }
  }
}

GetRefueling.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = GetRefueling;
