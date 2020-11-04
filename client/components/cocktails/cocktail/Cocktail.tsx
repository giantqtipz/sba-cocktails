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
  cocktails: {
    cocktail: CocktailAttributes;
  };
  authentication: {
    signedIn: boolean;
  };
}

const Cocktail: React.FC<Props> = (props) => {
  const {
    cocktails: { cocktail },
    authentication: { signedIn },
  }: CocktailProp = useSelector((state: StoreState) => state);
  const dispatch = useDispatch();
  const {
    match: {
      params: { id },
    },
  } = props;
  const currentURL = window.location.href;
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
    <div className="cocktail-details-container">
      <h2>{cocktail.name}</h2>
      <div className="cocktail-share-icons">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${currentURL}`}
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-facebook" />
        </a>
        <a
          href={`http://www.twitter.com/share?url=${currentURL}`}
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-twitter" />
        </a>
        <a
          href={`mailto:?body=${currentURL}&subject=Checkout the ${cocktail.name} by Soubriet Byrne and Associates!`}
          target="_blank"
          rel="noreferrer"
        >
          <i className="far fa-envelope" />
        </a>
      </div>
      <div className="image-container">
        <img src={cocktail.image} alt={cocktail.name} />
        {signedIn && (
          <button type="button" onClick={editCocktail}>
            <i className="fas fa-edit" />
          </button>
        )}
      </div>
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
