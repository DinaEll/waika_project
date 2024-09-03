module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
  ],
  env: {
    es6: true,
    browser: true,
    jest: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    projectService: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
        ],
        'newlines-between': 'never',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.scss'],
      },
      typescript: {
        alwaysTryTypes: true,
        project: './packages/*/tsconfig.json',
      },
    },
  },
  overrides: [
    {
      files: ['packages/server/**/*.{ts,tsx,js,jsx}'],
      env: {
        node: true,
      },
      settings: {
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
            project: './packages/server/tsconfig.json',
          },
        },
      },
    },

    {
      files: ['packages/client/**/*.{ts,tsx,js,jsx}'],
      extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
      plugins: ['react', 'react-hooks'],
      env: {
        browser: true,
      },
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react/self-closing-comp': [
          'error',
          {
            component: true,
            html: true,
          },
        ],
      },
      settings: {
        react: {
          version: 'detect',
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
            project: './packages/client/tsconfig.json',
          },
        },
      },
    },
  ],
  ignorePatterns: ['dist', 'coverage'],
};
