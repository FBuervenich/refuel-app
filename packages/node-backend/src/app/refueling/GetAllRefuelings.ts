import { TodoAny } from '../../../../common/types/ToDoTypes';
import Operation from '../Operation';

class GetAllRefuelings extends Operation {
  refuelingsRepository: TodoAny;

  constructor({ refuelingsRepository }) {
    super();
    this.refuelingsRepository = refuelingsRepository;
  }

  /**
   *
   * @param {string | undefined} userId
   */
  async execute(userId) {
    const { SUCCESS, ERROR } = this.outputs;

    const args = {
      attributes: [
        'id',
        'litres',
        'price',
        'pricePerLitre',
        'totalKilometers',
        'dayKilometers',
        'fullTank',
        'madeAt',
        'userId',
      ],
    };
    if (userId) {
      args.where = {
        userId,
      };
    }
    try {
      const refuelings = await this.refuelingsRepository.getAll(args);

      this.emit(SUCCESS, refuelings);
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllRefuelings.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllRefuelings;
