const Router = require('koa-router');
const config = require('../../config');

const HomeCtrl = () => {
  const name = '/';
  const router = new Router();

  router.get('/', async (ctx, next) => {
    await ctx.render('index', {
      host: config.host,
      port: config.port,
    });
  });

  return {
    router,
    name,
  };
};

module.exports = HomeCtrl();