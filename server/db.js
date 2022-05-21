const knex = require('knex');
const dbConfig = require('./db.config');

export default knex(dbConfig);
