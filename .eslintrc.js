const eslintConfig = {
  root: true,
  env: {
    es2021: true,
    jest: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    projectService: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './packages/*/tsconfig.json',
      },
    },
  },
  rules: {
    '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
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

  overrides: [
    {
      files: ['packages/client/**/*.{ts,tsx}'],
      env: {
        browser: true,
      },
      plugins: ['react', 'react-hooks'],
      extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        //'@feature-sliced', TODO fix errors
      ],
      parserOptions: {
        project: './packages/client/tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      settings: {
        react: {
          version: 'detect',
        },
        'import/resolver': {
          typescript: {
            project: './packages/client/tsconfig.json',
          },
        },
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
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
        'react/jsx-boolean-value': ['error', 'never'],
        'react/jsx-props-no-spreading': [
          'error',
          {
            html: 'enforce',
            custom: 'enforce',
            explicitSpread: 'ignore',
          },
        ],
      },
    },
    {
      files: ['packages/server/**/*.ts'],
      env: {
        node: true,
      },
      parserOptions: {
        project: './packages/server/tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      settings: {
        'import/resolver': {
          typescript: {
            project: './packages/server/tsconfig.json',
          },
        },
      },
    },
  ],
  ignorePatterns: ['.eslintrc.js'],
};

module.exports = eslintConfig;
