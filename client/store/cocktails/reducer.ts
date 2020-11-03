import { AnyAction } from 'redux';
import { TYPES } from '../types';
import { CocktailState } from './interface';

const initialState: CocktailState = {
  cocktail: {},
  cocktails: {
    limit: 0,
    count: 0,
    cocktails: [],
  },
};

export const cocktailsReducer = (
  state = initialState,
  action: AnyAction
): CocktailState => {
  switch (action.type) {
    case TYPES.ADD_COCKTAIL:
      return {
        ...state,
        cocktails: {
          ...state.cocktails,
          count: state.cocktails.count + 1,
          cocktails:
            state.cocktails.count >= 9
              ? [action.cocktail, ...state.cocktails.cocktails.slice(0, -1)]
              : [action.cocktail, ...state.cocktails.cocktails],
        },
      };
    case TYPES.CLEAR_COCKTAIL:
      return {
        ...state,
        cocktail: action.cocktail,
      };
    case TYPES.DELETE_COCKTAIL:
      return {
        ...state,
        cocktails: {
          ...state.cocktails,
          count: state.cocktails.count - 1,
          cocktails: state.cocktails.cocktails.filter(
            (cocktail) => cocktail.id !== action.id
          ),
        },
      };
    case TYPES.EDIT_COCKTAIL:
      return {
        ...state,
        cocktail: action.cocktail,
      };
    case TYPES.SET_COCKTAILS:
      return {
        ...state,
        cocktails: action.cocktails,
      };
    case TYPES.SET_COCKTAIL:
      return {
        ...state,
        cocktail: action.cocktail,
      };
    case TYPES.UPDATE_COCKTAILS:
      return {
        ...state,
        cocktails: {
          ...state.cocktails,
          cocktails: state.cocktails.cocktails.map((cocktail) =>
            cocktail.id === action.cocktail.id ? action.cocktail : cocktail
          ),
        },
      };
    default:
      return state;
  }
};
