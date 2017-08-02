const winston = require('winston');

const Logger = () => {
  function setup({level}) {
    winston.level = level;

    return winston;
  }

  function get() {
    return winston;
  }

  return {
    setup,
    get,
  };
};

module.exports = Logger();