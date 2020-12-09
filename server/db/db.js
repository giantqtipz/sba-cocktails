const { Sequelize } = require('sequelize');

const DATABASE_URL =
  process.env.DATABASE_URL || 'mysql.cocktails.sba-nyc.com';

const db = new Sequelize(DATABASE_URL, {
  logging: false,
});

module.exports = {
  db,
};
