const Operation = require('src/app/Operation');

class UpdateRefueling extends Operation {
  constructor({ refuelingsRepository }) {
    super();
    this.refuelingsRepository = refuelingsRepository;
  }

  async execute(refuelingId, refuelingData) {
    const { SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR } = this.outputs;

    try {
      const refueling = await this.refuelingsRepository.update(
        refuelingId,
        refuelingData
      );
      this.emit(SUCCESS, refueling);
    } catch (error) {
      switch (error.message) {
        case 'ValidationError':
          return this.emit(VALIDATION_ERROR, error);

        case 'NotFoundError':
          return this.emit(NOT_FOUND, error);

        default:
          this.emit(ERROR, error);
      }
    }
  }
}

UpdateRefueling.setOutputs([
  'SUCCESS',
  'NOT_FOUND',
  'VALIDATION_ERROR',
  'ERROR',
]);

module.exports = UpdateRefueling;
