import { Dictionary } from 'lodash';
import { TodoAny } from '@ra/common/dist/types/ToDoTypes';
import Operation from '../Operation';
import SequelizeRefuelingsRepository from '../../infra/refueling/SequelizeRefuelingsRepository';

class GetAllRefuelings extends Operation {
  refuelingsRepository: SequelizeRefuelingsRepository;

  constructor({ refuelingsRepository }) {
    super();
    this.refuelingsRepository = refuelingsRepository;
  }

  async execute(payload: {
    userId?: string;
    pagination?: { limit: number; offset?: number };
  }) {
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

    if (payload.userId) {
      args.where = { userId: payload.userId };
    }
    if (payload.pagination) {
      args.limit = payload.pagination.limit;
      args.order = [['madeAt', 'DESC']];

      if (payload.pagination.offset) {
        args.offset = payload.pagination.offset;
      }
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
