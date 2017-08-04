const Router = require('koa-router');
const passport = require('koa-passport');
const config = require('../../config');

const HomeCtrl = () => {
  const name = '/auth';
  const router = new Router();

  router.post('/passport/localstrategy', passport.authenticate('login', (ctx, next) => {
    console.log(ctx.user);
  }));

  router.post('/passport/signup', (ctx, next) => {
    return passport.authenticate(
      'signup',
      (...args) => {
        ctx.body = JSON.stringify(args[1]);
      }
    )(ctx, next);
  });

  return {
    router,
    name,
  };
};

module.exports = HomeCtrl();