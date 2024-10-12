const eslintConfig = {
  env: {
    node: true,
  },
  parserOptions: {
    project: './tsconfig.json',
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './packages/database/tsconfig.json',
      },
    },
  },
};

module.exports = eslintConfig;
