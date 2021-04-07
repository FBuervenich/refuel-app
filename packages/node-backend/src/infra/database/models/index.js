const { ModelsLoader } = require('src/infra/sequelize');
const { Sequelize, DataTypes } = require('sequelize');
const { db: config } = require('config');

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
