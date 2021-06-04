require('tsconfig-paths/register');
require('ts-node').register({ transpileOnly: true, logError: true });

module.exports = require(`./wdio.conf.ts`);
