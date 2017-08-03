const _ = require('lodash');
const Router = require('koa-router');
const modules = require('../modules');

const Routing = () => {
  const router = new Router();

  _(modules).pickBy(m => m.controllers != null)
    .pickBy(m => Object.keys(m.controllers).length > 0)
    .forIn((m) => {
      _(m.controllers).forIn(ctrl => {
        const args = [
          ctrl.router.routes(),
          ctrl.router.allowedMethods()
        ];

        if (ctrl.name != null) {
          args.unshift(ctrl.name);
        }

        router.use(...args);
      });
    });

  return router;
};

module.exports = Routing();



