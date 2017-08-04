const _ = require('lodash');
const crypto = require('crypto');

const Auth = (passport, config, models) => {
  const fetchUser = (() => {
    // This is an example! Use password hashing in your
    const user = { id: 1, username: 'test', password: 'test' }
    return async function() {
      return user
    }
  })();

  function hashPassword(password) {
    const hash = crypto.createHmac('sha256', config.secret)
      .update(password)
      .digest('hex');

    return hash;
  }

  passport.serializeUser(function(user, done) {
    console.log('ser', user);
    done(null, user.id);
  });

  passport.deserializeUser(async function(id, done) {
    console.log('des', id)
    try {
      const user = await fetchUser();
      done(null, user);
    } catch(err) {
      done(err);
    }
  });

  const LocalStrategy = require('passport-local').Strategy;
  const opts = {}

  passport.use('login', new LocalStrategy(opts, function(username, password, done) {
    const hash = hashPassword(password);

    models.User.findOne({
      where: {
        username: username,
        password: hash
      }
    })
      .then(user => {
        if (user != null) {
          return done(null, user);
        }

        return done(null, false);
      })
      .catch(err => done(err, false));
  }));

  passport.use('signup', new LocalStrategy(opts, function(username, password, done) {
    const hash = hashPassword(password);

    models.User.findOne({
      where: {
        username
      },
    })
      .then(user => {
        if (user != null) {
          throw new Error('User already exists');
        }

        return models.User.create({
          username: username,
          password: hash
        });
      })
      .then(user => {
        const u = _.pick(user.get({raw: true}), ['id', 'username']);
        done(null, u)
      })
      .catch(err => done(err, false));
  }));

  return passport;
};

module.exports = Auth;