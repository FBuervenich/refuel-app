import Sequelize, { DataTypes } from 'sequelize';

const RefuelingsModel = function(sequelize) {
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
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'refuelings',
    }
  );
};

export default RefuelingsModel;
