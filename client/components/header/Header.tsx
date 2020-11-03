import React from 'react';
import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
import AddCocktail from '../cocktails/cocktailForms/AddCocktail';
import { openModal } from '../../store/modal/actions';

import './header.scss';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const openAddCocktailModal = () => {
    return dispatch(
      openModal({
        BodyModal: AddCocktail,
        data: {},
        open: true,
        title: 'Add A New Cocktail',
      })
    );
  };
  return (
    <div className="header">
      <h1>SBA Cocktails</h1>
      <div className="links">
        {/* <Link to="#">Login</Link> */}
        <button type="button" onClick={openAddCocktailModal}>
          <i className="fas fa-cocktail" />
        </button>
      </div>
    </div>
  );
};

export default Header;
