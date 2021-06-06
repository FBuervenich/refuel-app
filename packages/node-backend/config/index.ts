import * as fs from 'fs';
import * as path from 'path';
import { Options } from 'sequelize';
import { Configuration } from 'log4js';

require('dotenv').config();

export interface EnvironmentConfig {
  web?: {
    port?: number | string;
  };
  logging?: Configuration;
}

const ENV = process.env.NODE_ENV || 'development';

const envConfig: EnvironmentConfig = require(path.join(
  __dirname,
  'environments',
  ENV
));
const dbConfig = loadDbConfig();

const config = Object.assign(
  {
    [ENV]: true,
    env: ENV,
    db: dbConfig,
  },
  envConfig
);

export default config;
export type Config = typeof config;

/** Loads the database config - either a config object or a db connection string. */
function loadDbConfig(): Options | string {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  if (fs.existsSync(path.join(__dirname, './database.js'))) {
    return require('./database')[ENV];
  }
  return '';
}
