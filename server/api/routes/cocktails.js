const cocktailsRouter = require('express').Router();
// const { check, validationResult } = require('express-validator');
const path = require('path');
const { Cocktail, Ingredient, Step } = require('../../db/models/index');
const { paginator, parseAttribute, updateCocktail } = require('./utils');
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });

cocktailsRouter.get('/cocktails/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cocktail = await Cocktail.findByPk(id, {
      include: [
        {
          model: Ingredient,
          as: 'ingredients',
        },
        {
          model: Step,
          as: 'steps',
        },
      ],
    });
    res.status(200).send(cocktail);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: 'Server error' });
  }
});

cocktailsRouter.get('/cocktails', async (req, res) => {
  const limit = 18;
  // change limit to 9 for default
  try {
    await paginator(req, res, limit);
  } catch (e) {
    res.status(500).send({ message: 'Server error' });
  }
});

cocktailsRouter.put('/cocktails/:id/:key', async (req, res) => {
  const { id, key } = req.params;
  const { name, description, image, steps, ingredients } = req.body;
  if (key !== process.env.REACT_APP_FIREBASE_KEY)
    return res.status(400).send({ message: 'Invalid credentials!' });
  try {
    await Promise.all([
      await updateCocktail(id, 'ingredient', ingredients),
      await updateCocktail(id, 'step', steps),
    ])
      .then(async (response) => {
        return response[1].update({
          name,
          description,
          image,
        });
      })
      .then(async () => {
        const updatedCocktail = await Cocktail.findByPk(id, {
          include: [
            {
              model: Ingredient,
              as: 'ingredients',
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'Cocktail_Ingredient'],
              },
            },
            {
              model: Step,
              as: 'steps',
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'Cocktail_Step'],
              },
            },
          ],
        });
        res.status(200).send(updatedCocktail);
      });
  } catch (e) {
    res.status(500).send({ message: 'Server error' });
  }
  return true;
});

cocktailsRouter.delete('/cocktails/:id/:key', async (req, res) => {
  const { id, key } = req.params;
  try {
    if (key !== process.env.REACT_APP_FIREBASE_KEY)
      return res.status(400).send({ message: 'Invalid credentials' });
    const deletedCocktail = await Cocktail.findByPk(id);
    await deletedCocktail.destroy();
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send({ message: 'Server error' });
  }
  return true;
});

cocktailsRouter.post('/cocktails/:key', async (req, res) => {
  const { key } = req.params;
  const { name, description, image, steps, ingredients } = req.body;
  const parsedIngredients = parseAttribute('ingredient', ingredients);
  const parsedSteps = parseAttribute('step', steps);
  try {
    if (key !== process.env.REACT_APP_FIREBASE_KEY)
      return res.status(400).send({ message: 'Invalid credentials' });
    await Cocktail.create({
      description,
      image,
      name,
    }).then(async (cocktail) => {
      await Promise.all([
        Ingredient.bulkCreate(parsedIngredients),
        Step.bulkCreate(parsedSteps),
      ]).then(async (response) => {
        await cocktail.setIngredients(response[0]);
        await cocktail.setSteps(response[1]);
        const newCocktail = await Cocktail.findByPk(cocktail.id, {
          include: [
            {
              model: Ingredient,
              as: 'ingredients',
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'Cocktail_Ingredient'],
              },
            },
            {
              model: Step,
              as: 'steps',
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'Cocktail_Step'],
              },
            },
          ],
        });
        await res.status(200).send(newCocktail);
      });
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: 'Server error' });
  }
  return true;
});

module.exports = {
  cocktailsRouter,
};
