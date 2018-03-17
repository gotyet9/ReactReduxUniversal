"use strict"
// REACT
import React from 'react';
import {render,hydrate} from 'react-dom';
import {Provider} from 'react-redux';

import {BrowserRouter} from 'react-router-dom';

import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// IMPORT COMBINED REDUCERS
import reducers from './reducers/index';
// IMPORT ACTIONS
import {addToCart} from './actions/cartActions';
// STEP 1 create the store
const middleware =applyMiddleware(thunk, logger);

//pass initial state from server store
const initialState=window.INITIAL_STATE;
const store = createStore(reducers,initialState, middleware);

import routes from './routes';

const Routes = (
  <Provider store={store}>
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  </Provider>
)

hydrate(
  Routes, document.getElementById('app')
);
