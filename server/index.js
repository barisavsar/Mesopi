const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('./db');

require('./auth/auth.strategy');
require('./auth/jwt.strategy');

const app = express();

app.use(express.json());

app.get('/system',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      appName: process.env.npm_package_name,
      appVersion: process.env.npm_package_version
    });
  });

app.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res) => {
    const token = jwt.sign({
      id: req.user.id,
      userId: req.user.userId,
      email: req.user.email,
    }, 'MesopiSecretKey123', { expiresIn: 24 * 60 * 60 }); // 1 day

    await db('User').update({ token }).where({ id: req.user.id });

    res.status(200).send({
      id: req.user.id,
      userId: req.user.userId,
      email: req.user.email,
      token,
    });
  });

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
