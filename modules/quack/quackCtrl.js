const Router = require('koa-router');

const QuackCtrl = () => {
  const name = '/quack';
  const router = new Router();

  router.get('/', async (ctx, next) => {
    const quacks = await ctx.models.Quack.findAll({
      include: [{
        model: ctx.models.User,
        attributes: ['id', 'username']
      }],
    });

    console.log('q', quacks);

    ctx.body = JSON.stringify(quacks);
  });

  router.post('/', async (ctx, next) => {
    console.log(ctx.request.body);

    const user = await ctx.models.User.findOne({where: {id: ctx.request.body.user}});

    if (!user) {
      throw new Error('User not found');
    }

    console.log('user', user);

    await ctx.models.Quack.create({UserId: user.id, content: ctx.request.body.content})

    ctx.status = 200;
  });

  return {
    name,
    router,
  };
};

module.exports = QuackCtrl();