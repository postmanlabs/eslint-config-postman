// Makes the config self-contained via plugins as it's own dependencies
// https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-patch/modern-module-resolution');

const { join, parse } = require('path'),
  { readdirSync } = require('fs'),

  plugins = readdirSync(join(__dirname, 'plugins')).map(plugin => parse(plugin).name);

module.exports = {
  plugins,
  env: {
    browser: false,
    node: true,
    es2022: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  settings: {
    lodash: {
      pragma: '_'
    }
  },
  extends: [
    ...plugins.map(plugin => join(__dirname, 'plugins', `${plugin}.js`)),
    ...readdirSync(join(__dirname, 'rules')).map(rule => join(__dirname, 'rules', rule))
  ],
  overrides: [
    {
      files: ['*.ts'],
      plugins: plugins.concat('@typescript-eslint'),
      parser: '@typescript-eslint/parser',
      // Rules inherited from https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts
      rules: {
        // The next few rules are disabled as they duplicate TypeScript errors: https://github.com/typescript-eslint/typescript-eslint/issues/1273
        'constructor-super': 'off', // ts(2335) & ts(2377)
        'getter-return': 'off', // ts(2378)
        'no-const-assign': 'off', // ts(2588)
        'no-dupe-args': 'off', // ts(2300)
        'no-dupe-class-members': 'off', // ts(2393) & ts(2300)
        'no-dupe-keys': 'off', // ts(1117)
        'no-func-assign': 'off', // ts(2539)
        'no-import-assign': 'off', // ts(2539) & ts(2540)
        'no-new-symbol': 'off', // ts(7009)
        'no-obj-calls': 'off', // ts(2349)
        'no-redeclare': 'off', // ts(2451)
        'no-setter-return': 'off', // ts(2408)
        'no-this-before-super': 'off', // ts(2376)
        'no-undef': 'off', // ts(2304)
        'no-unreachable': 'off', // ts(7027)
        'no-unsafe-negation': 'off', // ts(2365) & ts(2360) & ts(2358)
        'no-var': 'error', // ts transpiles let/const to var, so no need for vars any more
        'prefer-const': 'error', // ts provides better types with const
        'prefer-rest-params': 'error', // ts provides better types with rest args over arguments
        'prefer-spread': 'error', // ts transpiles spread to apply, so no need for manual apply
        'valid-typeof': 'off', // ts(2367)

        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/ban-ts-comment': 'error',
        '@typescript-eslint/ban-types': 'error',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-extra-non-null-assertion': 'error',
        '@typescript-eslint/no-inferrable-types': 'warn',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/no-this-alias': 'error',
        '@typescript-eslint/no-unnecessary-type-constraint': 'error',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/prefer-as-const': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/triple-slash-reference': 'error',

        'no-array-constructor': 'off',
        '@typescript-eslint/no-array-constructor': 'error',

        'no-empty-function': 'off',
        '@typescript-eslint/no-empty-function': 'error',

        'no-extra-semi': 'off',
        '@typescript-eslint/no-extra-semi': 'error',

        'no-loss-of-precision': 'off',
        '@typescript-eslint/no-loss-of-precision': 'error',

        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
      }
    },
    {
      files: ['test/**/*', 'npm/**/*'],
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
        'jsdoc/tag-lines': 'off',
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
