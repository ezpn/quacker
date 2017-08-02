const _ = require('lodash');
const Router = require('koa-router');
const modules = require('../modules');

const Routing = () => {
  const router = new Router();

  _(modules).pickBy(m => m.controllers != null)
    .pickBy(m => Object.keys(m.controllers).length > 0)
    .forIn((m) => {
      _(m.controllers).forIn(ctrl => {
        router.use(
          ctrl.name,
          ctrl.router.routes(),
          ctrl.router.allowedMethods()
        );
      });
    });

  return router;
};

module.exports = Routing();



