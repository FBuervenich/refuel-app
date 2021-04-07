module.exports = {
  'root': true,
  'env': {
    'node': true,
    'es6': true,
    'mocha': true
  },
  'parserOptions': {
    'ecmaVersion': 2019
  },
  'extends': 'eslint:recommended',
  'rules': {
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'linebreak-style': ['error'],
    'quotes': ['error', 'single', { 'avoidEscape': true }],
    'semi': ['error', 'always']
  }
};
