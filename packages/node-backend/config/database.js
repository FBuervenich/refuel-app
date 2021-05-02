module.exports = {
  development: {
    username: 'ydwfjych',
    password: 'bp2UXj7qCeK5eP0L1UVgCjqOdZPcIXsy',
    database: 'ydwfjych',
    host: 'balarama.db.elephantsql.com',
    dialect: 'postgres',
  },
  test: {
    username: 'root',
    password: null,
    database: 'boilerplate_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: null,
  },
  production: process.env.DATABASE_URL,
};
