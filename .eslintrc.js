module.exports = {
  root: true,

  env: {
    node: true,
    es6: true,
  },

  extends: ['eslint:recommended'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    'comma-spacing': ['error', { before: false, after: true }],
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error'],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
  },
};
