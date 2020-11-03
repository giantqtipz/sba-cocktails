const Sequelize = require('sequelize');

const { UUID, UUIDV4, INTEGER, STRING } = Sequelize;
const { db } = require('../db');

const Ingredient = db.define('Ingredient', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  ingredient: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  order: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = { Ingredient };
