import { Sequelize, Options, Model, AbstractDataType } from 'sequelize';
import sequelizeInfra from '../../../infra/sequelize';
import appConfig from '../../../../config';
import { Dictionary } from 'lodash';

const { ModelsLoader } = sequelizeInfra;
const config = appConfig.db as Options;

let sequelizeModels: Dictionary<Model>;
let sequelize: Sequelize;

if (config) {
  sequelize = new Sequelize(config);

  sequelizeModels = ModelsLoader.load({
    sequelize,
    baseFolder: __dirname,
  });
} else {
  /* eslint-disable no-console */
  console.error('Database configuration not found, disabling database.');
  /* eslint-enable no-console */
}
export { sequelizeModels as SequelizeModels, sequelize as database };
