const { Sequelize } = require('sequelize');

// const DB_URL =
//   process.env.NODE_ENV === 'production'
//     ? 'sba_cocktails'
//     : 'postgres://localhost:5432/SBA_Cocktails';

const db = new Sequelize('sba_cocktails', 'sbacocktails', 'sbanyc123!', {
  dialect: 'mysql',
  host: 'mysql.cocktails.sba-nyc.com',
  port: 3306,
});

db.authenticate()
  .then(() => console.log('connected', process.env.NODE_ENV, db))
  .catch(() => console.log('failed to connect to DB', db));

module.exports = {
  db,
};
