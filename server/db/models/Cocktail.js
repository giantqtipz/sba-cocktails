const Sequelize = require('sequelize');

const { UUID, UUIDV4, STRING, TEXT } = Sequelize;
const { db } = require('../db');

const Cocktail = db.define('Cocktail', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  image: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = { Cocktail };
