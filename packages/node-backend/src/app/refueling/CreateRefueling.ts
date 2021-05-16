import { TodoAny } from '@ra/common/dist/types/ToDoTypes';
import Refueling from '../../domain/refueling/Refueling';
import Operation from '../Operation';

class CreateRefueling extends Operation {
  refuelingsRepository: TodoAny;

  constructor({ refuelingsRepository }) {
    super();
    this.refuelingsRepository = refuelingsRepository;
  }

  async execute(refuelingData, userId) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

    const refueling = new Refueling({ ...refuelingData, userId });

    try {
      const newRefueling = await this.refuelingsRepository.add(refueling);

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

export default CreateRefueling;
