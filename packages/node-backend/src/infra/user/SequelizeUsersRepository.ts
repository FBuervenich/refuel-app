import { RepositoryError } from '../../app/utils/errors/types';
import { err, ok, Result } from 'neverthrow';
import { TodoAny } from '../../../../common/types/ToDoTypes';
const UserMapper = require('./SequelizeUserMapper');

class SequelizeUsersRepository {
  private UserModel: TodoAny;

  constructor({ UserModel }) {
    this.UserModel = UserModel;
  }

  async getAll(...args) {
    const users = await this.UserModel.findAll(...args);

    console.log(this.UserModel);
    console.log(typeof this.UserModel);

    return users.map(UserMapper.toEntity);
  }

  async getById(id) {
    const user = await this._getById(id);

    return UserMapper.toEntity(user);
  }

  async add(user): Promise<Result<TodoAny, RepositoryError>> {
    const { valid, errors } = user.validate();

    if (!valid) {
      const error: RepositoryError = {
        message: 'ValidationError',
        details: errors,
      };
      return err(error);
    }

    const newUser = await this.UserModel.create(UserMapper.toDatabase(user));
    const result = UserMapper.toEntity(newUser);
    return ok(result);
  }

  async remove(id): Promise<Result<TodoAny, RepositoryError>> {
    const userResult = await this._getById(id);

    if (userResult.isErr()) {
      return userResult;
    }
    await userResult.value.destroy();
    return ok(id);
  }

  async update(id, newData): Promise<Result<TodoAny, RepositoryError>> {
    const userResult = await this._getById(id);

    if (userResult.isErr()) {
      return userResult;
    }

    const user = userResult.value;

    const transaction = await this.UserModel.sequelize.transaction();

    try {
      const updatedUser = await user.update(newData, { transaction });
      const userEntity = UserMapper.toEntity(updatedUser);

      const { valid, errors } = userEntity.validate();

      if (!valid) {
        const error: RepositoryError = {
          message: 'ValidationError',
          details: errors,
        };
        return err(error);
      }
      await transaction.commit();

      return ok(userEntity);
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
    return await this.UserModel.count();
  }

  // Private
  async _getById(id: number): Promise<Result<TodoAny, RepositoryError>> {
    try {
      const user = await this.UserModel.findByPk(id, { rejectOnEmpty: true });
      return ok(user);
    } catch (e) {
      if (e.name === 'SequelizeEmptyResultError') {
        const error: RepositoryError = {
          message: 'NotFoundError',
          details: `User with id ${id} can't be found.`,
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

export default SequelizeUsersRepository;
