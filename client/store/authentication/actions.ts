import { TYPES } from '../types';
import { AppThunk } from '../thunkType';
import { app } from '../../components/config/firebase';
import { closeModal } from '../modal/actions';

const setAuthentication = (signedIn: boolean, key: string) => ({
  type: TYPES.SIGNED_IN,
  signedIn,
  key
});

export const logInPersistence = (key: string): AppThunk => async (dispatch) => {
  return dispatch(setAuthentication(true, key));
};

export const logIn = (email: string, password: string): AppThunk => async (
  dispatch
) => {
  const data = await app.auth().signInWithEmailAndPassword(email, password);
  if (data.user) {
    const { user } = data;
    dispatch(setAuthentication(true, user.l));
    dispatch(closeModal(false));
  }
};

export const logOut = (): AppThunk => async (dispatch) => {
  await app.auth().signOut();
  dispatch(setAuthentication(false, ''));
};
