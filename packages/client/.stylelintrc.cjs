const NAME_PATTERN = /^[a-z]+[a-zA-Z0-9]*$/;

module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-idiomatic-order',
  ],
  plugins: ['stylelint-order'],
  rules: {
    'order/order': [
      'custom-properties',
      'dollar-variables',
      'at-variables',
      'declarations',
      'rules',
      'at-rules',
      'less-mixins',
    ],
    'selector-class-pattern': [
      NAME_PATTERN,
      {
        message: (selector) =>
          `Expected class selector "${selector}" to be in camelCase`,
      },
    ],
    'selector-id-pattern': [
      NAME_PATTERN,
      {
        message: (selector) =>
          `Expected id selector "${selector}" to be in camelCase`,
      },
    ],
    'scss/percent-placeholder-pattern': [
      NAME_PATTERN,
      {
        message: (placeholder) =>
          `Expected placeholder "${placeholder}" to be in camelCase`,
      },
    ],
    'declaration-no-important': null,
    'font-family-name-quotes': 'always-unless-keyword',
    'font-weight-notation': 'numeric',
    'color-named': 'never',
    'color-function-notation': ['modern', { ignore: ['with-var-inside'] }],
  },
};
