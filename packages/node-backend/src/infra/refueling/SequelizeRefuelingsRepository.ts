import { RepositoryError } from '../../app/utils/errors/types';
import { err, ok, Result } from 'neverthrow';
import { TodoAny } from '@ra/common/dist/types/ToDoTypes';
import RefuelingMapper from './SequelizeRefuelingMapper';
import { RefuelingModelType } from '../database/models/Refueling';

class SequelizeRefuelingsRepository {
  private RefuelingModel: typeof RefuelingModelType;

  constructor({ RefuelingModel }) {
    this.RefuelingModel = RefuelingModel;
  }

  async getAll(...args) {
    const refuelings = await this.RefuelingModel.findAll(...args);

    return refuelings.map(RefuelingMapper.toEntity);
  }

  async getById(id: number): Promise<Result<TodoAny, RepositoryError>> {
    const refuelingResult = await this._getById(id);

    if (refuelingResult.isErr()) {
      return err(refuelingResult.error);
    }

    const refuelingEntity = RefuelingMapper.toEntity(refuelingResult.value);
    return ok(refuelingEntity);
  }

  async add(refueling): Promise<Result<TodoAny, RepositoryError>> {
    const { valid, errors } = refueling.validate();

    if (!valid) {
      const error: RepositoryError = {
        message: 'ValidationError',
        details: errors,
      };

      return err(error);
    }

    const newRefueling = await this.RefuelingModel.create(
      RefuelingMapper.toDatabase(refueling)
    );
    return ok(RefuelingMapper.toEntity(newRefueling));
  }

  async remove(id): Promise<Result<TodoAny, RepositoryError>> {
    const refuelingResult = await this._getById(id);

    if (refuelingResult.isErr()) {
      return refuelingResult;
    }

    await refuelingResult.value.destroy();
    return ok(id);
  }

  async update(id, newData): Promise<Result<TodoAny, RepositoryError>> {
    const refuelingResult = await this._getById(id);

    if (refuelingResult.isErr()) {
      return refuelingResult;
    }

    const refueling = refuelingResult.value;

    const transaction = await this.RefuelingModel.sequelize?.transaction();

    if (!transaction) {
      const error: RepositoryError = {
        message: 'Error',
        details: { error: 'Could not create transaction for update' },
      };
      return err(error);
    }

    try {
      const updatedRefueling = await refueling.update(newData, { transaction });
      const refuelingEntity = RefuelingMapper.toEntity(updatedRefueling);

      await transaction.commit();

      return ok(refuelingEntity);
    } catch (e) {
      await transaction.rollback();

      const error: RepositoryError = {
        message: 'Error',
        details: e,
      };
      return err(error);
    }
  }

  async count() {
    return await this.RefuelingModel.count();
  }

  // Private

  async _getById(id): Promise<Result<TodoAny, RepositoryError>> {
    try {
      const result = await this.RefuelingModel.findByPk(id, {
        rejectOnEmpty: true,
      });
      return ok(result);
    } catch (e) {
      if (e.name === 'SequelizeEmptyResultError') {
        const error: RepositoryError = {
          message: 'NotFoundError',
          details: `Refueling with id ${id} can't be found.`,
        };

        return err(error);
      }

      const error: RepositoryError = {
        message: 'Error',
        details: e,
      };
      return err(error);
    }
  }
}

export default SequelizeRefuelingsRepository;
