import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { cocktailsReducer } from './cocktails/reducer';
import { modalReducer } from './modal/reducer';
import { authenticationReducer } from './authentication/reducer';

const reducers = combineReducers({
  authentication: authenticationReducer,
  cocktails: cocktailsReducer,
  modal: modalReducer,
});

let middleware = [
  ReduxThunk,
  createLogger({
    collapsed: true,
  }),
];

if (process.env.NODE_ENV === 'production') {
  middleware = [
    ...middleware,
    createLogger({
      collapsed: true,
    }),
  ];
}

export type AppState = ReturnType<typeof reducers>;

export const store = createStore(reducers, applyMiddleware(...middleware));

export type StoreState = ReturnType<typeof reducers>;
