import { AnyAction } from 'redux';
import { TYPES } from '../types';
import { AuthenticationState } from './interface';

const initialState: AuthenticationState = {
  signedIn: false,
  key: '',
};

export const authenticationReducer = (
  state = initialState,
  action: AnyAction
): AuthenticationState => {
  switch (action.type) {
    case TYPES.SIGNED_IN:
      return {
        signedIn: action.signedIn,
        key: action.key
      };
    default:
      return state;
  }
};
