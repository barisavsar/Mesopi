const passport = require('passport');
const LocalStrategy = require('passport-local');
const db = require('../db');

passport.use(new LocalStrategy({
    usernameField: 'userId',
    passwordField: 'password',
    session: false
  }, async (username, password, done) => {
      const users = await db('User').select('*').where({
        userId: username,
        password
      });
      
      if (users && users.length) {
          return done(null, users[0]);
      }

      return done(null, false);
    }
  ));
