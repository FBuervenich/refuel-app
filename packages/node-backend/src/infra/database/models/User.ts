import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { User as UserAttributes } from '@ra/common/dist/interfaces/types/User.schema';

export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id'> {}

export class UserModelType extends Model<
  UserAttributes,
  UserCreationAttributes
> {}

const UserModel = function (sequelize: Sequelize) {
  class User extends UserModelType implements UserAttributes {
    public id!: number;
    public name!: string;
    public age!: number;
  }

  return User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      age: DataTypes.NUMBER,
    },
    {
      sequelize,
      tableName: 'users',
    }
  );
};

export default UserModel;
