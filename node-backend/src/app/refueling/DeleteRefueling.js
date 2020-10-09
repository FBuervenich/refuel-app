const Operation = require('src/app/Operation');

class DeleteRefueling extends Operation {
  constructor({ refuelingsRepository }) {
    super();
    this.refuelingsRepository = refuelingsRepository;
  }

  async execute(refuelingId) {
    const { SUCCESS, ERROR, NOT_FOUND } = this.outputs;

    try {
      await this.refuelingsRepository.remove(refuelingId);
      this.emit(SUCCESS);
    } catch (error) {
      if (error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }

      this.emit(ERROR, error);
    }
  }
}

DeleteRefueling.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = DeleteRefueling;
