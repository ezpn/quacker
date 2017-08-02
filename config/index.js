const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV || 'local';
const configFile = `${env}.json`;
const configPath = path.join(__dirname, `${configFile}`);

if (!fs.existsSync(configPath)) {
  throw new Error(`Config file "${configFile}" does not exist`);
}

const config = require(configPath);

if (config.db.options.storage) {
  config.db.options.storage = path.join(__dirname, config.db.options.storage);
}

console.log(config);

module.exports = config;