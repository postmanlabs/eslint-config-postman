module.exports = {
  plugins: ['node'],
  rules: {
    'node/no-callback-literal': 'error',
    'node/no-exports-assign': 'error',
    'node/no-extraneous-import': 'error',
    'node/no-extraneous-require': 'off',
    'node/no-missing-import': 'error',
    'node/no-missing-require': 'error',
    'node/no-unpublished-bin': 'error',
    'node/no-unpublished-import': 'error',
    'node/no-unpublished-require': 'off',
    'node/no-unsupported-features/es-builtins': 'error',
    'node/no-unsupported-features/es-syntax': 'off',
    'node/no-unsupported-features/node-builtins': 'error',
    'node/process-exit-as-throw': 'off',
    'node/shebang': 'error',

    'node/no-deprecated-api': 'error',

    'node/exports-style': 'off',
    'node/file-extension-in-import': 'off',
    'node/prefer-global/buffer': 'error',
    'node/prefer-global/console': 'error',
    'node/prefer-global/process': 'error',
    'node/prefer-global/text-decoder': 'error',
    'node/prefer-global/text-encoder': 'error',
    'node/prefer-global/url-search-params': 'error',
    'node/prefer-global/url': 'error',
    'node/prefer-promises/dns': 'off',
    'node/prefer-promises/fs': 'off',

    'node/callback-return': 'error',
    'node/global-require': 'off',
    'node/handle-callback-err': 'error',
    'node/no-mixed-requires': 'off',
    'node/no-new-require': 'off',
    'node/no-path-concat': 'error',
    'node/no-process-env': 'error',
    'node/no-process-exit': 'off',
    'node/no-restricted-require': 'error',
    'node/no-sync': 'off'
  }
};
