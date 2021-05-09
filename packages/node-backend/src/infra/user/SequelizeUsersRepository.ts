import { IInfraError } from '@/app/utils/errors/types';
import { IErrorFactory } from '@/app/utils/errors/utils';
import { TodoAny } from '../../../../common/types/ToDoTypes';
import { Context } from '../contexts';
const UserMapper = require('./SequelizeUserMapper');

class SequelizeUsersRepository {
  private UserModel: TodoAny;
  private createError: IErrorFactory<IInfraError>;
  private errorFactory: (context: Context) => IErrorFactory<IInfraError>;

  constructor({ UserModel, infraErrorFactory }) {
    this.UserModel = UserModel;
    this.errorFactory = infraErrorFactory;

    this.createError = this.errorFactory('user');
  }

  async getAll(...args) {
    const users = await this.UserModel.findAll(...args);

    return users.map(UserMapper.toEntity);
  }

  async getById(id) {
    const user = await this._getById(id);

    return UserMapper.toEntity(user);
  }

  async add(user) {
    const { valid, errors } = user.validate();

    if (!valid) {
      const error = new Error('ValidationError');
      error.details = errors;

      throw error;
    }

    const newUser = await this.UserModel.create(UserMapper.toDatabase(user));
    return UserMapper.toEntity(newUser);
  }

  async remove(id) {
    const user = await this._getById(id);

    await user.destroy();
    return;
  }

  async update(id, newData) {
    const user = await this._getById(id);

    const transaction = await this.UserModel.sequelize.transaction();

    try {
      const updatedUser = await user.update(newData, { transaction });
      const userEntity = UserMapper.toEntity(updatedUser);

      const { valid, errors } = userEntity.validate();

      if (!valid) {
        const error = new Error('ValidationError');
        error.details = errors;

        throw error;
      }

      await transaction.commit();

      return userEntity;
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  }

  async count() {
    return await this.UserModel.count();
  }

  // Private

  async _getById(id) {
    try {
      return await this.UserModel.findByPk(id, { rejectOnEmpty: true });
    } catch (error) {
      if (error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `User with id ${id} can't be found.`;

        throw notFoundError;
      }

      throw error;
    }
  }
}

export default SequelizeUsersRepository;