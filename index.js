const config = require('./config');
const {sequelize} = require('./lib/models')(config.db);
const Koa = require('koa');
const send = require('koa-send');
const handlebars = require('koa-handlebars');
const Logger = require('./lib/logger');
const Routing = require('./lib/routing');

initialize({
  config,
  sequelize,
  Koa,
  Logger,
  Routing,
  send,
  handlebars,
});

async function initialize({config, sequelize, Koa, Logger, Routing, send, handlebars}) {
  const app = new Koa();
  let logger = null;

  try {
    logger = setupLogger(Logger, config.logging);
    setupHandlebars(app, handlebars);
    setupRouting(app, Routing);
    setupStaticContent(app, config.static, send);
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

function setupHandlebars(app, handlebars) {
  app.use(handlebars({defaultLayout: 'main'}))
}

function setupStaticContent(app, staticConfig, send) {
  app.use(async (ctx) => {
    await send(ctx, ctx.path, staticConfig);
  });
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