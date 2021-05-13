import { TodoAny } from '../../../../common/types/ToDoTypes';
import Operation from '../Operation';

class GetRefueling extends Operation {
  refuelingsRepository: TodoAny;

  constructor({ refuelingsRepository }) {
    super();
    this.refuelingsRepository = refuelingsRepository;
  }

  /**
   *
   * @param {number} refuelingId
   * @param {string | undefined} userId
   */
  async execute(refuelingId, userId) {
    const { SUCCESS, NOT_FOUND, FORBIDDEN } = this.outputs;

    let refueling;
    try {
      refueling = await this.refuelingsRepository.getById(refuelingId);
    } catch (error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details,
      });
    }

    if (refueling.userId !== userId) {
      this.emit(FORBIDDEN, {
        type: 'FORBIDDEN',
        details: `NOT ALLOWED TO FETCH REFUELING WITH ID ${refuelingId}`,
      });
    } else {
      this.emit(SUCCESS, refueling);
    }
  }
}

GetRefueling.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND', 'FORBIDDEN']);

export default GetRefueling;
