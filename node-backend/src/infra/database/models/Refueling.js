'use strict';

module.exports = function (Sequelize, sequelize, DataTypes) {
  class RefuelingModel extends Sequelize.Model {}

  return RefuelingModel.init(
    {
      litres: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      pricePerLitre: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      totalKilometers: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      dayKilometers: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      fullTank: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      madeAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'refuelings',
    }
  );
};
