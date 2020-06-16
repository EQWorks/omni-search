module.exports = {
    parser: 'babel-eslint',
    env: {
      browser: true,
      es6: true,
      node: true,
      jest: true
    },
    settings: {
      react: {
        pragma: 'React',
        version: '16.13',
      },
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    plugins: [
      'react',
      'react-hooks',
      'jest'
    ],
    rules: {
      indent: ['error', 2],
    },
  }