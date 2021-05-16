import { RepositoryError } from '../../app/utils/errors/types';
import { err, ok, Result } from 'neverthrow';
import { TodoAny } from '../../../../common/types/ToDoTypes';
import RefuelingMapper from './SequelizeRefuelingMapper';

class SequelizeRefuelingsRepository {
  private RefuelingModel: TodoAny;

  constructor({ RefuelingModel }) {
    this.RefuelingModel = RefuelingModel;
  }

  async getAll(...args) {
    const refuelings = await this.RefuelingModel.findAll(...args);

    return refuelings.map(RefuelingMapper.toEntity);
  }

  async getById(id) {
    const refueling = await this._getById(id);

    return RefuelingMapper.toEntity(refueling);
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
    return RefuelingMapper.toEntity(newRefueling);
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

    const transaction = await this.RefuelingModel.sequelize.transaction();

    try {
      const updatedRefueling = await refueling.update(newData, { transaction });
      const refuelingEntity = RefuelingMapper.toEntity(updatedRefueling);

      const { valid, errors } = refuelingEntity.validate();

      if (!valid) {
        const error: RepositoryError = {
          message: 'ValidationError',
          details: errors,
        };
        return err(error);
      }

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
