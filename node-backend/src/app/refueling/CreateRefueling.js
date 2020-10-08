const Operation = require('src/app/Operation');
const Refueling = require('src/domain/refueling/Refueling');

class CreateRefueling extends Operation {
  constructor({ refuelingRepository }) {
    super();
    this.refuelingRepository = refuelingRepository;
  }

  async execute(refuelingData) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

    const refueling = new Refueling(refuelingData);

    try {
      const newRefueling = await this.refuelingRepository.add(refueling);

      this.emit(SUCCESS, newRefueling);
    } catch (error) {
      if (error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }

      this.emit(ERROR, error);
    }
  }
}

CreateRefueling.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports = CreateRefueling;
