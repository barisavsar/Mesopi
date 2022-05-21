module.exports = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        database: 'mesopi',
        user: 'root',
        password: 'mesopi',
    },
    pool: {
        min: 2,
        max: 10,
    },
    seeds: {
        directory: `${__dirname}/dbseeds`,
    },
    debug: false,
};
