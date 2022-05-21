const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../db');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'MesopiSecretKey123';

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    return done(null, jwt_payload);
}));
