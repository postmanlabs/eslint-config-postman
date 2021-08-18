module.exports = {
  rules: {
    'arrow-body-style': ['error', 'always'],
    'arrow-parens': ['error', 'always'],
    'arrow-spacing': 'error',
    'constructor-super': 'error',
    'generator-star-spacing': 'error',
    'no-class-assign': 'error',
    'no-confusing-arrow': 'error',
    'no-const-assign': 'error',
    'no-dupe-class-members': 'error',
    'no-duplicate-imports': 'error',
    'no-new-symbol': 'error',
    'no-restricted-imports': 'error',
    'no-this-before-super': 'error',
    'no-useless-catch': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-constructor': 'error',
    'no-useless-rename': ['error', {
      'ignoreDestructuring': false,
      'ignoreImport': false,
      'ignoreExport': false
    }],
    'no-var': 'off',
    'object-shorthand': ['error', 'always'],
    'prefer-arrow-callback': 'off',
    'prefer-const': ['off', {
      'destructuring': 'all',
      'ignoreReadBeforeAssign': true
    }],
    'prefer-destructuring': ['off', {
      'VariableDeclarator': {
        'array': false,
        'object': false
      },
      'AssignmentExpression': {
        'array': true,
        'object': false
      }
    }, {
      'enforceForRenamedProperties': false
    }],
    'prefer-numeric-literals': 'error',
    'prefer-rest-params': 'off',
    'prefer-spread': 'off',
    'prefer-template': 'off',
    'require-yield': 'error',
    'rest-spread-spacing': 'error',
    'sort-imports': 'off',
    'symbol-description': 'off',
    'template-curly-spacing': 'error',
    'yield-star-spacing': 'error'
  }
};
