import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

import { StoreState } from './store';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  StoreState,
  unknown,
  Action<string>
>;
