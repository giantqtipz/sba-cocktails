import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { CocktailAttributes } from '../../../store/cocktails/interface';

interface Props {
  fields: CocktailAttributes;
  setFields: Dispatch<SetStateAction<CocktailAttributes>>;
  data?: CocktailAttributes;
}

const Ingredients: React.FC<Props> = (props) => {
  const [ingredients, setIngredients] = useState([
    { id: '', ingredient: '', order: 0 },
  ]);
  const { fields, setFields, data } = props;
  const ingredientsInputHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    idx: number
  ) => {
    const ingredientsValues = [...ingredients];
    ingredientsValues[idx].ingredient = event.target.value;
    ingredientsValues[idx].order = idx;
    setIngredients(ingredientsValues);
    setFields({
      ...fields,
      ingredients: ingredientsValues,
    });
  };

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: '', ingredient: '', order: ingredients.length },
    ]);
  };

  const deleteIngredient = (idx: number) => {
    const ingredientsValues = [...ingredients];
    ingredientsValues.splice(idx, 1);
    const updatedOrder = ingredientsValues.map((ingredient, index) => {
      return {
        id: ingredient.id,
        ingredient: ingredient.ingredient,
        order: index,
      };
    });
    setIngredients(updatedOrder);
    setFields({
      ...fields,
      ingredients: updatedOrder,
    });
  };

  useEffect(() => {
    if (data && data.ingredients && data.steps) {
      setIngredients(data.ingredients);
      setFields({
        ...fields,
        ingredients: data.ingredients,
        steps: data.steps,
      });
    }
  }, []);
  return (
    <label htmlFor="ingredients">
      <span>Ingredients</span>
      <button className="add-button" onClick={addIngredient} type="button">
        +
      </button>
      <ul>
        {ingredients
          .sort((a, b) => a.order - b.order)
          .map((ingredient, idx) => (
            <li>
              <textarea
                name="ingredient"
                value={ingredients[idx].ingredient}
                onChange={(event) => ingredientsInputHandler(event, idx)}
                required
              />
              {idx > 0 && (
                <button
                  className="delete-button"
                  onClick={() => deleteIngredient(idx)}
                  type="button"
                >
                  <i className="fas fa-trash" />
                </button>
              )}
            </li>
          ))}
      </ul>
    </label>
  );
};

export default Ingredients;
