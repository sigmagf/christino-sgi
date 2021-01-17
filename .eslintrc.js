module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'eslint-plugin-import-helpers',
    'import',
    'react-hooks',
  ],
  rules: {
    /* Disable need to specify protypes */
    'react/prop-types': 'off',
    /* Disable rule that remove 'I' from interfaces */
    '@typescript-eslint/interface-name-prefix': 'off',

    /* Disable object new life forced */
    'object-curly-newline': 'off',

    /* Disable error on class methods without this */
    'class-methods-use-this': 'off',

    /* Enable devDependencies import */
    'import/no-extraneous-dependencies': 'off',

    /* Disable forced camelcase */
    camelcase: 'off',
    '@typescript-eslint/camelcase': 'off',

    /* Fix unused vars */
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',

    /* Disable force default export */
    'import/prefer-default-export': 'off',

    /* Disable need of extension */
    'import/extensions': 'off',
    'import/no-unresolved': 'off',

    /* Enable empty constructors */
    'no-useless-constructor': 'off',

    /* Remove need for empty line in classes */
    'lines-between-class-members': 'off',

    /* Enable console and alert */
    'no-console': 'off',
    'no-alert': 'off',

    /* Enable '...props' */
    'react/jsx-props-no-spreading': 'off',

    /* Enable jsx syntax in tsx */
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],

    /* Defines max row length */
    'max-len': [
      'warn',
      { code: 170 },
    ],

    /* Enable and add import order helpers */
    'import-helpers/order-imports': [
      'error',
      {
        newlinesBetween: 'always',
        groups: [
          'module',
          '/^~/',
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],

    /* Disable forced space between functions/methods and parentheses */
    'keyword-spacing': [
      'warn',
      {
        overrides: {
          if: { after: false },
          for: { after: false },
          while: { after: false },
          catch: { after: false },
          switch: { after: false },
        },
      },
    ],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['~', './src']],
      },
    },
  },
};
