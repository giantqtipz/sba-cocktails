import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCocktail } from '../../../store/cocktails/actions';
import { StoreState } from '../../../store/store';
import { CocktailAttributes } from '../../../store/cocktails/interface';
import { openModal } from '../../../store/modal/actions';
import EditCocktail from '../cocktailForms/EditCocktail';
import './cocktail.scss';

interface Props {
  match: {
    params: {
      id: string;
    };
  };
}

interface CocktailProp {
  cocktail: CocktailAttributes;
}

const Cocktail: React.FC<Props> = (props) => {
  const { cocktail }: CocktailProp = useSelector(
    (state: StoreState) => state.cocktails
  );
  const dispatch = useDispatch();
  const {
    match: {
      params: { id },
    },
  } = props;
  const editCocktail = () => {
    return dispatch(
      openModal({
        BodyModal: EditCocktail,
        data: cocktail,
        open: true,
        title: 'Edit Cocktail',
      })
    );
  };
  useEffect(() => {
    dispatch(fetchCocktail(id));
  }, []);
  return (
    <div className="cocktail-details">
      <button type="button" onClick={editCocktail}>
        Edit
      </button>
      <h2>{cocktail.name}</h2>
      <img src={cocktail.image} alt={cocktail.name} />
      <p>{cocktail.description}</p>
      <hr />
      <h4>Ingredients</h4>
      <ul>
        {cocktail &&
          cocktail.ingredients &&
          (cocktail.ingredients as any).map(
            (ingredient: { ingredient: string }) => (
              <li>{ingredient.ingredient}</li>
            )
          )}
      </ul>
      <hr />
      <h4>Steps</h4>
      <ol>
        {cocktail &&
          cocktail.steps &&
          (cocktail.steps as any).map((step: { step: string }) => (
            <li>{step.step}</li>
          ))}
      </ol>
      <hr />
    </div>
  );
};

export default Cocktail;
