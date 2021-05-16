import Operation from '../Operation';
import { TodoAny } from '@ra/common/dist/types/ToDoTypes';

class GetAllUsers extends Operation {
  usersRepository: TodoAny;

  constructor({ usersRepository }) {
    super();
    this.usersRepository = usersRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const users = await this.usersRepository.getAll({
        attributes: ['id', 'name'],
      });

      this.emit(SUCCESS, users);
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllUsers.setOutputs(['SUCCESS', 'ERROR']);

export default GetAllUsers;
