import { EnvironmentConfig } from '../';

const config: EnvironmentConfig = {
  web: {
    port: process.env.PORT,
  },
  logging: {
    appenders: {
      out: { type: 'console', layout: { type: 'basic' } },
    },
    categories: {
      default: {
        appenders: ['out'],
        level: 'info',
      },
    },
  },
};

module.exports = config;
