import Operation from '../Operation';

import { TodoAny } from '../../../../common/types/ToDoTypes';

class UpdateUser extends Operation {
  usersRepository: TodoAny;

  constructor({ usersRepository }) {
    super();
    this.usersRepository = usersRepository;
  }

  async execute(userId, userData) {
    const { SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR } = this.outputs;

    try {
      const user = await this.usersRepository.update(userId, userData);
      this.emit(SUCCESS, user);
    } catch (error) {
      switch (error.message) {
        case 'ValidationError':
          return this.emit(VALIDATION_ERROR, error);
        case 'NotFoundError':
          return this.emit(NOT_FOUND, error);
        default:
          this.emit(ERROR, error);
      }
    }
  }
}

UpdateUser.setOutputs(['SUCCESS', 'NOT_FOUND', 'VALIDATION_ERROR', 'ERROR']);

export default UpdateUser;
