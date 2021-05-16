import { Dictionary } from 'lodash';
import { TodoAny } from '@ra/common/dist/types/ToDoTypes';
import Operation from '../Operation';

class GetAllRefuelings extends Operation {
  refuelingsRepository: TodoAny;

  constructor({ refuelingsRepository }) {
    super();
    this.refuelingsRepository = refuelingsRepository;
  }

  async execute(userId: string | undefined) {
    const { SUCCESS, ERROR } = this.outputs;

    const args: Dictionary<TodoAny> = {
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

export default GetAllRefuelings;
