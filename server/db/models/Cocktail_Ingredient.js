const { db } = require('../db');

const Cocktail_Ingredient = db.define('Cocktail_Ingredient');

module.exports = { Cocktail_Ingredient };
