// Makes the config self-contained via plugins as it's own dependencies
// https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-patch/modern-module-resolution');

const { join } = require('path'),
  { readdirSync } = require('fs');

module.exports = {
  plugins: ['jsdoc', 'lodash', 'mocha', 'node', 'security', 'sonarjs', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
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
      files: [
        '*.ts'
      ],
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {
        '@typescript-eslint/no-inferrable-types': 'warn'
      }
    },
    {
      files: ['*.js', '*.ts'
      ],
      rules: {
        'node/no-unsupported-features/es-syntax': 'off'
      }
    },
    {
      files: ['test/**/*', 'npm/*'],
      globals: {
        rm: true,
        set: true,
        test: true,
        exec: true,
        mocha: true,
        app: true, // as part of test bootstrap
        expect: true, // as part of test bootstrap
        sails: true
      },
      rules: {
        'prefer-const': 'off',
        'consistent-return': 'off',
        'node/no-process-env': 'off',
        'node/no-callback-literal': 'off',
        'security/detect-child-process': 'off',
        'security/detect-non-literal-require': 'off',
        'security/detect-non-literal-fs-filename': 'off',
        'sonarjs/no-duplicate-string': 'off',
        'sonarjs/no-identical-functions': 'off'
      }
    }
  ]
};
