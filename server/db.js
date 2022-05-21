const knex = require('knex');
const dbConfig = require('./db.config');

module.exports = knex(dbConfig);
