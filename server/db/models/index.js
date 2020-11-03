const { Cocktail } = require('./Cocktail');
const { Cocktail_Ingredient } = require('./Cocktail_Ingredient');
const { Cocktail_Step } = require('./Cocktail_Step');
const { Ingredient } = require('./Ingredient');
const { Step } = require('./Step');

Cocktail.belongsToMany(Ingredient, {
  as: 'ingredients',
  through: Cocktail_Ingredient,
  onDelete: 'cascade',
  hooks: 'true',
});
Ingredient.belongsToMany(Cocktail, {
  as: 'cocktail',
  through: Cocktail_Ingredient,
});

Cocktail.belongsToMany(Step, {
  as: 'steps',
  through: Cocktail_Step,
  onDelete: 'cascade',
  hooks: 'true',
});
Step.belongsToMany(Cocktail, { as: 'cocktail', through: Cocktail_Step });

module.exports = {
  Cocktail,
  Cocktail_Ingredient,
  Cocktail_Step,
  Ingredient,
  Step,
};
