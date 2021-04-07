const baseConfig = require('../.eslintrc');

module.exports = {
  ...baseConfig,

  env: {
    node: true,
  },

  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {},
  },

  extends: ['plugin:vue/vue3-essential', '@vue/typescript', '@vue/prettier'],
  rules: {
    // disable default "no-unused-vars"-error and
    // enable the typescript-version (details: https://stackoverflow.com/questions/55280555/typescript-eslint-eslint-plugin-error-route-is-defined-but-never-used-no-un)
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
  },
};
