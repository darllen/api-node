const sequelize = require('sequelize');

const database = process.env.DATABASE;
const user = process.env.USER;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const dialect = process.env.DIALECT;

const connection = new sequelize(database, user, password, {
    host,
    dialect
});

module.exports = connection;