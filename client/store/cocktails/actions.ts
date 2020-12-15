import axios from 'axios';
import { TYPES } from '../types';
import { CocktailAttributes } from './interface';
import { AppThunk } from '../thunkType';

const removeCocktail = (id: string) => ({
  type: TYPES.DELETE_COCKTAIL,
  id,
});

const resetCocktail = () => ({
  type: TYPES.SET_COCKTAIL,
  cocktail: {},
});

const setCocktail = (cocktail: CocktailAttributes) => ({
  type: TYPES.SET_COCKTAIL,
  cocktail,
});

const setCocktails = (cocktails: CocktailAttributes[]) => ({
  type: TYPES.SET_COCKTAILS,
  cocktails,
});

const addCocktail = (cocktail: CocktailAttributes[]) => ({
  type: TYPES.ADD_COCKTAIL,
  cocktail,
});

const editCocktail = (cocktail: CocktailAttributes[]) => ({
  type: TYPES.EDIT_COCKTAIL,
  cocktail,
});

const updateCocktails = (cocktail: CocktailAttributes[]) => ({
  type: TYPES.UPDATE_COCKTAILS,
  cocktail,
});

export const clearCocktail = (): AppThunk => async (dispatch) => {
  return dispatch(resetCocktail());
};

export const createCocktail = (
  newCocktail: CocktailAttributes
): AppThunk => async (dispatch) => {
  const { data } = await axios.post(`/api/cocktails/`, newCocktail);
  console.log(data);
  return dispatch(addCocktail(data));
};

export const fetchCocktail = (id: string): AppThunk => async (dispatch) => {
  const { data } = await axios.get(`/api/cocktails/${id}`);
  return dispatch(setCocktail(data));
};

export const fetchCocktails = (params: string): AppThunk => async (
  dispatch
) => {
  const { data } = await axios.get(`/api/cocktails/${params}`);
  return dispatch(setCocktails(data));
};

export const updateCocktail = (
  id: string | undefined,
  updatedCocktail: CocktailAttributes
): AppThunk => async (dispatch) => {
  const { data } = await axios.put(`/api/cocktails/${id}`, updatedCocktail);
  await dispatch(updateCocktails(data));
  await dispatch(editCocktail(data));
};

export const deleteCocktail = (id: string): AppThunk => async (dispatch) => {
  await axios.delete(`/api/cocktails/${id}`);
  return dispatch(removeCocktail(id));
};
