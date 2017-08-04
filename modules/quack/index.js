const QuackModel = require('./quackModel');
const QuackController = require('./quackCtrl')

const QuackModule = {
  models: {
    QuackModel,
  },
  controllers: {
    QuackController,
  },
};

module.exports = QuackModule;