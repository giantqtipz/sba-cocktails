import { TYPES } from '../types';
import { AppThunk } from '../thunkType';
import { app } from '../../components/config/firebase';
import { closeModal } from '../modal/actions';

const setAuthentication = (signedIn: boolean) => ({
  type: TYPES.SIGNED_IN,
  signedIn,
});

export const logInPersistence = (): AppThunk => async (dispatch) => {
  return dispatch(setAuthentication(true));
};

export const logIn = (email: string, password: string): AppThunk => async (
  dispatch
) => {
  const data = await app.auth().signInWithEmailAndPassword(email, password);
  if (data.user) {
    dispatch(setAuthentication(true));
    dispatch(closeModal(false));
  }
};

export const logOut = (): AppThunk => async (dispatch) => {
  await app.auth().signOut();
  dispatch(setAuthentication(false));
};
