import * as path from 'path';
import { EnvironmentConfig } from '../';
const logPath = path.join(__dirname, '../../../logs/development.log');

const config: EnvironmentConfig = {
  web: {
    port: 3000,
  },
  logging: {
    appenders: {
      out: { type: 'console' },
      file: { type: 'file', filename: logPath },
    },
    categories: {
      default: {
        appenders: ['out', 'file'],
        level: 'info',
      },
    },
  },
};

module.exports = config;
