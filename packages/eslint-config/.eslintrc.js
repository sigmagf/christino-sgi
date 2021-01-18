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
    // 'plugin:react-hooks/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'eslint-plugin-import-helpers',
    'import',
    'jsx-a11y',
    'react-hooks',
  ],
  rules: {
    /* ============================== REACT ============================== */
    /* React hooks config */
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    /* Enable tags and exoressuibs in same line on JSX */
    'react/jsx-one-expression-per-line': 'off',

    /* Enable '...props' */
    'react/jsx-props-no-spreading': 'off',

    /* Disable need to specify protypes */
    'react/prop-types': 'off',

    // "jsx-a11y/label-has-associated-control": "off",
    // "jsx-a11y/control-has-associated-label": "off",

    /* Enable jsx syntax in tsx */
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    /* ============================ END REACT ============================ */



    /* ============================ TYPESCRIPT ============================ */
    /* Enable any type */
    '@typescript-eslint/no-explicit-any': 'off',

    /* Enable empty functions */
    '@typescript-eslint/no-empty-function': 'off',

    /* Remove explicit return type of function */
    '@typescript-eslint/explicit-function-return-type': 'off',

    /* Enable require */
    "@typescript-eslint/no-var-requires": "off",
    
    // "@typescript-eslint/explicit-module-boundary-types": "off",

    /* Disable rule that remove 'I' from interfaces */
    '@typescript-eslint/interface-name-prefix': 'off',
    /* ========================== END TYPESCRIPT ========================== */
    
    
    
    /* ============================== IMPORT ============================== */
    /* Enable devDependencies import */
    'import/no-extraneous-dependencies': 'off',

    /* Disable force default export */
    'import/prefer-default-export': 'off',

    /* Disable need of extension */
    'import/extensions': 'off',
    'import/no-unresolved': 'off',

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
    /* ============================ END IMPORT ============================ */



    /* ============================== COMMON ============================== */
    /* Disabele force compact arrow functions */
    'arrow-body-style': 'off',

    /* Enable nameless functions */
    'func-names': 'off',

    /* Enable plus plus */
    'no-plusplus': 'off',

    /* Disable object new life forced */
    'object-curly-newline': 'off',

    /* Disable error on class methods without this */
    'class-methods-use-this': 'off',

    /* Disable forced camelcase */
    camelcase: 'off',
    '@typescript-eslint/camelcase': 'off',

    /* Fix unused vars */
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',

    /* Enable empty constructors */
    'no-useless-constructor': 'off',

    /* Remove need for empty line in classes */
    'lines-between-class-members': 'off',

    /* Enable console and alert */
    'no-console': 'off',
    'no-alert': 'off',

    /* Defines max row length */
    'max-len': [
      'warn',
      { code: 170 },
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
    /* ============================ END COMMON ============================ */
  },
  settings: {
    'import/resolver': {
      alias: { map: [['~', './src']] },
    },
  },
};
