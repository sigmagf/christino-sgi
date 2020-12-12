module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
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
    '@typescript-eslint/camelcase': 'off',
    'no-plusplus': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/no-extraneous-dependencies': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'jsx-a11y/control-has-associated-label': 'off',

    /* Enable use text and tag in same line */
    'react/jsx-one-expression-per-line': 'off',

    /* Enable jsx syntax in tsx */
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],

    /* Disable need to add type for props */
    'react/prop-types': 'off',

    'react/jsx-props-no-spreading': 'off',

    /* Disable no need for "I" in interfaces */
    '@typescript-eslint/interface-name-prefix': 'off',

    /* Disable retun type */
    '@typescript-eslint/explicit-function-return-type': 'off',

    /* Enable any type */
    '@typescript-eslint/no-explicit-any': 'off',

    /* Enable empty functions */
    '@typescript-eslint/no-empty-function': 'off',

    /* ??? */
    '@typescript-eslint/explicit-module-boundary-types': 'off',

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

    /* Disabele force compact arrow functions */
    'arrow-body-style': 'off',

    /* Disable object new line */
    'object-curly-newline': 'off',

    /* Enable console and alert */
    'no-console': 'off',
    'no-alert': 'off',

    /* Defines max row length */
    'max-len': [
      'warn',
      { code: 120 },
    ],

    /* Enable nameless functions */
    'func-names': 'off',

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
