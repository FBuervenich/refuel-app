import { DataTypes, Model, Optional } from 'sequelize';

// TODO move to /domain/refueling
interface UserAttributes {
  id: number;
  name: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

const UserModel = function(sequelize) {
  class User extends Model {
    public id!: number;
    public name: string;
  }

  return User.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'users',
    }
  );
};

export default UserModel;
