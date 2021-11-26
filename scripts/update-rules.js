const fs = require('fs'),
    https = require('https'),

    chalk = require('chalk'),
    yaml = require('js-yaml'),

    { dependencies: { eslint }} = require('../package.json');

module.exports = (exit) => {
  https
    .get({
      hostname: 'raw.githubusercontent.com',
      path: `/eslint/eslint.github.io/v${eslint}/_data/rules.yml`
    }, (res) => {
      if (res.statusCode !== 200) { throw new Error('Non 200 response received from GitHub'); }

      let data = '';

      res.on('data', (chunk) => { data += chunk; });

      return res.on('end', () => {
        let config,
          noMissingRules = true,
          noRemovedRules = true,
          noDeprecatedRules = true,
          currentRules = fs.readdirSync('rules').reduce((result, category) => {
            return Object.assign(result, require('../rules/' + category).rules);
          }, {});

        config = yaml.load(data);

        // @TODO: Make this work for plugins too
        // @TODO: Auto apply updates to existing config?
        // @TODO: Deduplicate the code below
        for (let category of config.types) {
          for (let rule of category.rules) {
            if (!currentRules[rule.name]) {
              if (noMissingRules) {
                noMissingRules = false;
                console.info(chalk.gray.bold('Missing lint rules:'));
                console.info(chalk.yellow(category.displayName));
              }

              console.info(chalk.blue.bold(rule.name), rule.description);
            }
          }
        }

        for (let rule of config.deprecated.rules) {
          if (currentRules[rule.name]) {
            if (noDeprecatedRules) {
              noDeprecatedRules = false;
              console.warn(chalk.keyword('orange').bold(`\nRules deprecated in ESLint ${eslint}:`));
            }

            console.info(rule.name, rule.replacedBy);
          }
        }

        for (let rule of config.removed.rules) {
          if (currentRules[rule.removed]) {
            if (noRemovedRules) {
              noRemovedRules = false;
              console.warn(chalk.red.bold(`\nRules removed in ESLint ${eslint}:`));
            }

            console.info(rule.removed, rule.replacedBy);
          }
        }

        if (noMissingRules && noRemovedRules && noDeprecatedRules) {
          console.info(chalk.green.bold(`ESLint rules are up to date with ${eslint}`));
        }

        return exit();
      });
    })
    .on('error', (err) => { throw err; });
};

(require.main === module) && module.exports(process.exit);
