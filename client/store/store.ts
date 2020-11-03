import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { cocktailsReducer } from './cocktails/reducer';
import { modalReducer } from './modal/reducer';

const reducers = combineReducers({
  cocktails: cocktailsReducer,
  modal: modalReducer,
});

const middleware = [
  ReduxThunk,
  createLogger({
    collapsed: true,
  }),
];

export type AppState = ReturnType<typeof reducers>;

export const store = createStore(reducers, applyMiddleware(...middleware));

export type StoreState = ReturnType<typeof reducers>;
