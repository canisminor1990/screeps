/**
 * Author: Ruo
 * Create: 2018-04-04
 * Description:
 */
module.exports = {
  parser: 'typescript-eslint-parser',
  extends: [
    'standard',
    'prettier',
    'prettier/standard',
  ],
  plugins: [
    'prettier',
    'standard',
    'typescript',
  ],
  env: {
    'es6': true,
    'node': true,
  },
  rules: {
    'prettier/prettier': [
      2, {
        'printWidth': 100,
        'singleQuote': true,
        'trailingComma': 'all',
      },
    ],
    'no-undef': [0],
    'no-unused-vars': [1],
    'no-unused-expressions': [0],
  },
};