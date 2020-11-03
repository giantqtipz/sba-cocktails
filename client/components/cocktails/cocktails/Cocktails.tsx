import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCocktail,
  fetchCocktails,
} from '../../../store/cocktails/actions';
import { openModal } from '../../../store/modal/actions';
import { CocktailAttributes } from '../../../store/cocktails/interface';
import { StoreState } from '../../../store/store';
import EditCocktail from '../cocktailForms/EditCocktail';
import './cocktails.scss';
import Paginator from '../../paginator/Paginator';

interface Props {
  props: {
    location: {
      search: string;
    };
  };
}

const Cocktails: React.FC<Props> = ({
  props: {
    location: { search },
  },
}) => {
  const {
    cocktails: { cocktails, count, limit },
  } = useSelector((state: StoreState) => state.cocktails);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCocktails(search));
    dispatch(clearCocktail());
  }, [search]);
  return (
    <div className="cocktails-list-container">
      <div className="cocktails-container">
        <div className="cocktails">
          {cocktails &&
            cocktails.map((cocktail: CocktailAttributes) => {
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
              return (
                <div className="cocktail">
                  <Link to={`/cocktails/${cocktail.id}`} key={cocktail.id}>
                    <img src={cocktail.image} alt={cocktail.name} />
                    <h3>{cocktail.name}</h3>
                  </Link>
                  <button type="button" onClick={editCocktail}>
                    <i className="fas fa-edit" />
                  </button>
                </div>
              );
            })}
        </div>
      </div>
      <Paginator count={count} limit={limit} search={search} />
    </div>
  );
};

export default Cocktails;
