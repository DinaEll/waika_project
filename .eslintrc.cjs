module.exports = {
  env: {
    es2021: true,
    jest: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/strict'],
  ignorePatterns: ['dist', 'coverage'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './packages/*/tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  root: true,
};
