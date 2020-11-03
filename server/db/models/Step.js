const Sequelize = require('sequelize');

const { UUID, UUIDV4, INTEGER, TEXT } = Sequelize;
const { db } = require('../db');

const Step = db.define('Step', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  step: {
    type: TEXT,
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

module.exports = { Step };
