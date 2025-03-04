/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss', '@stylistic/stylelint-config'],
  rules: {
    'scss/at-mixin-pattern': null,
    'alpha-value-notation': null,
    'color-hex-length': 'long',
    'color-function-notation': null,
    'custom-property-pattern': null,
    'selector-class-pattern': null,
    'value-keyword-case': [
      'lower',
      {
        ignoreKeywords: ['currentColor'],
      },
    ],
  },
};
