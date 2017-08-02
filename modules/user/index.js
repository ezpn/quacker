const UserModel = require('./userModel');
const UserCtrl = require('./userCtrl');

const UserModule = {
  models: {
    UserModel,
  },
  controllers: {
    UserCtrl,
  },
};

module.exports = UserModule;