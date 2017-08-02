const config = require('./config');
const {sequelize} = require('./lib/models')(config.db);
const Koa = require('koa');
const Logger = require('./lib/logger');
const Routing = require('./lib/routing');

initialize({
  config,
  sequelize,
  Koa,
  Logger,
  Routing
});

async function initialize({config, sequelize, Koa, Logger, Routing}) {
  const app = new Koa();
  let logger = null;

  try {
    logger = setupLogger(Logger, config.logging);
    setupRouting(app, Routing);
    await syncModels(sequelize, config.db);
    await listen(app, config.port);
  } catch (err) {
    console.error(err.message, err.stack);
  }

  logger.info(`Application started on port ${config.port}`);
}

function setupLogger(Logger, loggingConfig) {
  return Logger.setup(loggingConfig);
}

function setupRouting(app, Routing) {
  app.use(Routing.routes())
    .use(Routing.allowedMethods());
}

async function syncModels(sequelize, dbConfig) {
  return sequelize.sync({ force: config.db.force });
}

async function listen(app, port) {
  return app.listen(port);
}