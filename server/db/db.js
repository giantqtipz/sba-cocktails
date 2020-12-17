const path = require('path');
const { Sequelize } = require('sequelize');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const DB_URL =
  process.env.NODE_ENV === 'production'
    ? 'sba_cocktails'
    : 'postgres://localhost:5432/SBA_Cocktails';

const db =
  process.env.NODE_ENV === 'production'
    ? new Sequelize(DB_URL, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
      })
    : new Sequelize('postgres://localhost:5432/SBA_Cocktails');

db.authenticate()
  .then(() => console.log('connected'))
  .catch(() => console.log('failed to connect to DB'));

module.exports = {
  db,
};
