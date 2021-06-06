import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Refueling as RefuelingAttributes } from '@ra/common/dist/interfaces/types/Refueling.schema';

export interface RefuelingCreationAttributes
  extends Optional<RefuelingAttributes, 'id'> {}

export class RefuelingModelType extends Model<
  RefuelingAttributes,
  RefuelingCreationAttributes
> {}

const RefuelingsModel = function (sequelize: Sequelize) {
  class Refueling extends RefuelingModelType implements RefuelingAttributes {
    public id!: number;
    public litres!: number;
    public price!: number;
    public pricePerLitre!: number;
    public totalKilometers!: number | null;
    public dayKilometers!: number | null;
    public fullTank!: boolean | null;
    public madeAt!: Date;
    public userId!: string;
  }

  return Refueling.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
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
        allowNull: true,
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
