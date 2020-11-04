import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AddCocktail from '../cocktails/cocktailForms/AddCocktail';
import Login from '../login/Login';
import { openModal } from '../../store/modal/actions';
import { StoreState } from '../../store/store';
import { logOut } from '../../store/authentication/actions';

import './header.scss';

const Header: React.FC = () => {
  const { signedIn } = useSelector((state: StoreState) => state.authentication);
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
  const loginModal = () => {
    return dispatch(
      openModal({
        BodyModal: Login,
        data: {},
        open: true,
        title: 'Login',
      })
    );
  };

  const logoutUser = () => {
    dispatch(logOut());
  };

  return (
    <div className="header">
      <Link to="/">
        <h1>SBA Cocktails</h1>
      </Link>
      <div className="links">
        {signedIn ? (
          <button type="button" onClick={logoutUser}>
            <i className="fas fa-sign-out-alt" />
          </button>
        ) : (
          <button type="button" onClick={loginModal}>
            <i className="fa fa-user" aria-hidden="true" />
          </button>
        )}
        {signedIn && (
          <button type="button" onClick={openAddCocktailModal}>
            <i className="fas fa-cocktail" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
