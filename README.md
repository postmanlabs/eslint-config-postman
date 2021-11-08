Common ESLint rules for Postman

# Installation
```sh
npm install --save-dev eslint-config-postman
```

# Configuration
Update the `.eslintrc` in the project root as follows:
```json
{
  "root": true,
  "extends": "postman"
}
```

# Usage
_Only make these changes if you want to remove ESLint as a direct dependency._
## CLI
No changes needed!

## Programmatic
Replace `require('eslint')` with `require('eslint-config-postman/node_modules/eslint')`
_More details:_ [https://eslint.org/docs/developer-guide/nodejs-api](https://eslint.org/docs/developer-guide/nodejs-api)

# Cleanup
_If you're not using additional plugins, prune nested config files with:_
```sh
find . -name .eslintrc -type f -mindepth 2 -delete;
```

## Optional
>
This is recommended to abstract plugin specifics away into one config bundle
Skip this if you're using ESLint as a CLI, or if you're using other plugins in addition to those covered by this config

```sh
npm uninstall eslint eslint-plugin-jsdoc eslint-plugin-lodash eslint-plugin-mocha eslint-plugin-node eslint-plugin-security
```
