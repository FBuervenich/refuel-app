import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

// TODO move to /domain/refueling
interface RefuelingAttributes {
  id: number;
  litres: number;
  price: number;
  pricePerLitre: number;
  totalKilometers: number;
  dayKilometers: number;
  fullTank: boolean;
  madeAt: Date;
  userId: string;
}

interface RefuelingCreationAttributes
  extends Optional<RefuelingAttributes, 'id'> {}

const RefuelingsModel = function(sequelize: Sequelize) {
  class Refueling
    extends Model<RefuelingAttributes, RefuelingCreationAttributes>
    implements RefuelingAttributes {
    public id!: number;
    public litres!: number;
    public price!: number;
    public pricePerLitre!: number;
    public totalKilometers!: number | null;
    public dayKilometers!: number | null;
    public fullTank!: boolean;
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
