import { Sequelize, DataTypes, Options } from 'sequelize';
const { ModelsLoader } = require('src/infra/sequelize');
import appConfig from '../../../../config';

const config = appConfig.db as Options;

if (config) {
  const sequelize = new Sequelize(config);

  module.exports = ModelsLoader.load({
    Sequelize,
    sequelize,
    DataTypes,
    baseFolder: __dirname,
  });
} else {
  /* eslint-disable no-console */
  console.error('Database configuration not found, disabling database.');
  /* eslint-enable no-console */
}
