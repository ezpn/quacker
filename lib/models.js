const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const Sequelize = require('sequelize');
const modules = require('../modules');

const Db = (config) => {
  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config.options
  );

  const models = _(modules).pickBy(m => m.models != null)
    .pickBy(m => Object.keys(m.models).length > 0)
    .forIn(m => {
      _(m.models).forIn((model, modelName) => {
        sequelize.import(modelName, model)
      });
    });

  return {
    models: sequelize.models,
    sequelize: sequelize,
  };
};

module.exports = Db;