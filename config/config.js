require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'onboarding',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mydb',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql'
  },
  test: {
    username: process.env.DB_USER || 'onboarding',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME_TEST || 'mydb_test',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USER || 'onboarding',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mydb',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql'
  }
};
