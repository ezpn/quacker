const config = require('./config');
const models = require('./lib/models');
const Koa = require('koa');
const send = require('koa-send');
const bodyParser = require('koa-bodyparser');
const convert = require('koa-convert');
const session = require('koa-generic-session');
const passport = require('koa-passport');
const auth = require('./lib/auth');
const handlebars = require('koa-handlebars');
const Logger = require('./lib/logger');
const Routing = require('./lib/routing');

initialize({
  config,
  models,
  Koa,
  Logger,
  Routing,
  send,
  handlebars,
  bodyParser,
  convert,
  session,
  passport,
  auth,
});

async function initialize({
  config,
  models,
  Koa,
  Logger,
  Routing,
  send,
  handlebars,
  bodyParser,
  convert,
  session,
  passport,
  auth,
}) {
  const app = new Koa();
  let logger = null;

  try {
    logger = setupLogger(Logger, config.logging);
    sequelize = setupDb(app, models, config.db)
    setupBodyParser(app, bodyParser);
    setupSession(app, convert, session, config);
    setupAuth(app, passport, auth, config.auth, sequelize.models);
    setupHandlebars(app, handlebars);
    setupRouting(app, Routing);
    setupStaticContent(app, config.static, send);
    await syncModels(app, sequelize, config.db);
    await listen(app, config.port);
  } catch (err) {
    console.error(err.message, err.stack);
  }

  logger.info(`Application started on port ${config.port}`);
}

function setupLogger(Logger, loggingConfig) {
  return Logger.setup(loggingConfig);
}

function setupDb(app, models, dbConfig) {
  const {sequelize, middleware} = models(dbConfig);
  app.use(middleware);

  return sequelize;
}

function setupBodyParser(app, bodyParser) {
  app.use(bodyParser());
}

function setupSession(app, converter, session, config) {
  app.keys = [config.secret];
  app.use(convert(session()));
}

function setupAuth(app, passport, auth, authConfig, models) {
  const passportAuth = auth(passport, authConfig, models);

  app.use(passportAuth.initialize());
  app.use(passportAuth.session());
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

async function syncModels(app, sequelize, dbConfig) {
  return sequelize.sync({ force: dbConfig.force });
}

async function listen(app, port) {
  return app.listen(port);
}