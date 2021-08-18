const { join } = require('path'),
  { readdirSync } = require('fs');

module.exports = {
  plugins: ['jsdoc', 'lodash', 'mocha', 'node', 'security'],
  env: {
    browser: false,
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 2020
  },
  settings: {
    lodash: {
      pragma: '_'
    }
  },
  extends: [
    ...readdirSync(join(__dirname, 'plugins')).map(plugin => join(__dirname, 'plugins', plugin)),
    ...readdirSync(join(__dirname, 'rules')).map(rule => join(__dirname, 'rules', rule))
  ],
  overrides: [
    {
      files: ['npm/*'],
      globals: {
        'exec': true,
        'rm': true,
        'set': true,
        'test': true
      }
    },
    {
      files: ['test/**/*'],
      env: {
        mocha: true
      },
      globals: {
        'app': true, // as part of test bootstrap
        'expect': true, // as part of test bootstrap
        'sails': true
      },
      rules: {
        'prefer-const': 'off'
      }
    },
    {
      files: ['test/**/*', 'npm/*'],
      rules: {
        'security/detect-non-literal-require': 'off',
        'security/detect-non-literal-fs-filename': 'off',
        'node/no-process-env': 'off',
        'node/no-callback-literal': 'off',
        'consistent-return': 'off'
      }
    }
  ]
};
