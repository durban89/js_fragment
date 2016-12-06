'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from '../stores';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

let initialState = {};
let jobs = [];

Promise.all(jobs).then(() => {
  initialState = {};

  const store = configureStore(initialState);

  const history = syncHistoryWithStore(browserHistory, store);

  let rootRoute = {
    childRoutes: [{
      path: '/home',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/App'))
        });
      },
      getIndexRoute(nextState, cb) {
        cb(null, {
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./home/stores/home'))
            });
          }
        });
      },
      childRoutes: [
        require('./home/routes/signin'),
        require('./assets/routes/assets'),
      ]
    }]
  }

  render(
    <Provider store={store}>
      <div>
        <Router history={history} onUpdate={() => window.scrollTo(0, 0)} routes={rootRoute} />
      </div>
    </Provider>, document.getElementById('container')
  )
})
