const baseConfig = require('../.eslintrc');

module.exports = {
  ...baseConfig,
  env: {
    mocha: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2019,
  },
  extends: [],
  rules: {},
};
