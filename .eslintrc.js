module.exports = {
  env: {
    node: true,
    commonjs: true,
    browser: true,
    es6: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-underscore-dangle': 'off',
  },
};
