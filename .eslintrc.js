module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  rules: {
    'object-curly-spacing': [1, 'always'],
    'no-multiple-empty-lines': [1, { max: 1 }],
    'no-console': 1,
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'max-len': [1, { code: 100 }],
    'import/no-default-export': 'off',
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: 'export', next: '*' },
      { blankLine: 'always', prev: 'import', next: '*' },
      { blankLine: 'any', prev: 'import', next: 'import' },
      { blankLine: 'always', prev: 'function', next: '*' }
    ]
  }
};
