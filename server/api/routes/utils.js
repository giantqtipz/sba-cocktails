const { Op } = require('sequelize');
const {
  Cocktail,
  Cocktail_Ingredient,
  Cocktail_Step,
  Ingredient,
  Step,
} = require('../../db/models/index');

const paginator = async (req, res, limit) => {
  const { searchIngredients, searchTerm } = req.query;
  const ingredients =
    searchIngredients &&
    searchIngredients.split(',').map((ingredient) => `%${ingredient}%`);
  const { page } = req.query;
  if (!searchIngredients) {
    await Cocktail.findAndCountAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${searchTerm || ''}%`,
            },
          },
          {
            description: {
              [Op.iLike]: `${searchTerm || ''}%`,
            },
          },
        ],
      },
    }).then(async (data) => {
      const offset = limit * (page === undefined ? 1 - 1 : page - 1);
      await Cocktail.findAll({
        limit,
        offset,
        order: [[`createdAt`, 'DESC']],
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `%${searchTerm || ''}%`,
              },
            },
            {
              description: {
                [Op.iLike]: `${searchTerm || ''}%`,
              },
            },
          ],
        },
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
      })
        .then((cocktails) => {
          return res.status(200).send({ count: data.count, limit, cocktails });
        })
        .catch(() => res.status(500).send({ message: 'Server error' }));
    });
  }

  if (searchIngredients) {
    await Ingredient.findAll({
      where: {
        ingredient: {
          [Op.iLike]: {
            [Op.any]: ingredients,
          },
        },
      },
      include: [
        {
          model: Cocktail,
          as: 'cocktail',
          attributes: {
            exclude: ['Cocktail_Ingredient'],
          },
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
        },
      ],
    })
      .then((response) => {
        const duplicateCounter = {};
        const arrayOfCocktails = response.map((resp) => resp.cocktail[0]);
        arrayOfCocktails.forEach((r) => {
          duplicateCounter[r.id] = (duplicateCounter[r.id] || 0) + 1;
        });
        const filterIngredientsByCocktail = arrayOfCocktails
          .filter((cocktail) => {
            return (
              duplicateCounter[cocktail.id] >= ingredients.length && cocktail
            );
          })
          .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);
        const paginateIngredientsByCocktail = (array) => {
          return array.slice((page - 1) * limit, page * limit);
        };
        res.status(200).send({
          count: filterIngredientsByCocktail.length,
          limit,
          cocktails: paginateIngredientsByCocktail(filterIngredientsByCocktail),
        });
      })
      .catch(() => res.status(500).send({ message: 'Server error' }));
  }
};

const updateCocktail = async (id, attribute, params) => {
  const cocktailToUpdate = await Cocktail.findByPk(id);
  const Model = attribute === 'ingredient' ? Ingredient : Step;
  const RelationModel =
    attribute === 'ingredient' ? Cocktail_Ingredient : Cocktail_Step;
  const deletion = await RelationModel.findAll({
    where: {
      CocktailId: cocktailToUpdate.id,
    },
  }).then(async (res) => {
    const unusedAttributes = res
      .filter(
        (param) =>
          !params.find((p) =>
            attribute === 'ingredient'
              ? param.IngredientId === p.id
              : param.StepId === p.id
          )
      )
      .map((p) => (attribute === 'ingredient' ? p.IngredientId : p.StepId));
    return Model.destroy({
      where: {
        id: unusedAttributes,
      },
    });
  });
  const updateOrCreate = params.map(async (param) => {
    if (param.id !== '') {
      const paramToUpdate = await Model.findByPk(param.id);
      return paramToUpdate.update({
        [attribute]: param[attribute],
        order: param.order,
      });
    }
    return Model.create({
      [attribute]: param[attribute],
      order: param.order,
    }).then((newParams) =>
      attribute === 'ingredient'
        ? cocktailToUpdate.addIngredients(newParams)
        : cocktailToUpdate.addSteps(newParams)
    );
  });
  return Promise.all([await deletion, ...updateOrCreate]).then(() => {
    return cocktailToUpdate;
  });
};

const parseAttribute = (type, attribute) => {
  return attribute.map((attr) => {
    return {
      [type]: attr[type],
      order: attr.order,
    };
  });
};

module.exports = {
  paginator,
  parseAttribute,
  updateCocktail,
};
