import Operation from '../Operation';

import { TodoAny } from '../../../../common/types/ToDoTypes';

class GetUser extends Operation {
  usersRepository: TodoAny;

  constructor({ usersRepository }) {
    super();
    this.usersRepository = usersRepository;
  }

  async execute(userId) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {
      const user = await this.usersRepository.getById(userId);
      this.emit(SUCCESS, user);
    } catch (error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details,
      });
    }
  }
}

GetUser.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

export default GetUser;
