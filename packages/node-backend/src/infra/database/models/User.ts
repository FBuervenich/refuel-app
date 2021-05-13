import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

// TODO move to /domain/refueling
interface UserAttributes {
  id: number;
  name: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

const UserModel = function(sequelize: Sequelize) {
  class User extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
    public id!: number;
    public name: string;
  }

  return User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'users',
    }
  );
};

export default UserModel;
