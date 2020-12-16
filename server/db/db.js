const { Sequelize } = require('sequelize');

const DB_URL =
  process.env.NODE_ENV === 'development'
    ? 'sba_cocktails'
    : 'postgres://localhost:5432/SBA_Cocktails';

const db = new Sequelize('sba_cocktails', 'sbacocktails', 'sbanyc123!', {
  dialect: 'mysql',
  host: 'mysql.cocktails.sba-nyc.com',
  port: 3306,
});

// const db = new Sequelize('postgres://localhost:5432/SBA_Cocktails');

db.authenticate()
  .then(() => console.log('connected', process.env.NODE_ENV))
  .catch(() => console.log('failed to connect to DB', db));

module.exports = {
  db,
};
