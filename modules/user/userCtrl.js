const Router = require('koa-router');

const UserCtrl = () => {
  const name = '/user';
  const router = new Router();

  router.get('/', async (ctx, next) => {
    ctx.body = 'User';
  });

  return {
    name,
    router,
  };
}

module.exports = UserCtrl();