'use strict';

module.exports = function (Sequelize, sequelize, DataTypes) {
  class UserModel extends Sequelize.Model {}

  return UserModel.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'users',
    }
  );
};
