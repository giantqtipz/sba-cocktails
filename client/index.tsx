import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
// import 'normalize-scss';
import '../public/styles.scss';

import App from './app';

const root = document.querySelector('#root');

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  root
);
