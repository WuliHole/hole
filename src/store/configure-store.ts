import {
  createStore,
  applyMiddleware,
  compose,
  Middleware,
} from 'redux';
import { fromJS } from 'immutable';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { preloadSession } from './preloadSession'
const persistState = require('redux-localstorage');

import promiseMiddleware from '../middleware/promise-middleware';
import logger from './logger';
import rootReducer from '../reducers';
import { getCookie } from '../utils/cookie'
declare const __DEV__: boolean; // from webpack

export function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(..._getMiddleware()),
      persistState('session', _getStorageConfig()),
      __DEV__ && environment.devToolsExtension ? environment.devToolsExtension() : f => f
    )
  );

  _enableHotLoader(store);
  return store;
}

export function _getMiddleware(): Middleware[] {
  let middleware = [
    routerMiddleware(browserHistory as any),
    promiseMiddleware,
    thunk,
  ];

  if (__DEV__) {
    middleware = [...middleware, logger];
  }

  return middleware;
}

const environment: any = window || this;

function _enableHotLoader(store) {
  if (!__DEV__) {
    return;
  }

  const { hot } = module as any;
  if (hot) {
    hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }
}

function _getStorageConfig() {
  return {
    key: 'hole-session',
    serialize: (store) => {
      store.session = store.session.set('isLoading', false)
      store.session = store.session.set('hasError', false)
      return store && store.session ?
        JSON.stringify(store.session.toJS()) : store;
    },
    deserialize: (state) => {
      const data = JSON.parse(state)

      if (data && data.token && data.refreshToken) {
        return {
          session: fromJS(data)
        }
      }
    },
  };
}

const store = configureStore({
  session: fromJS(preloadSession())
})

export const getToken = () => {
  const s = store.getState()
  return s.session.getIn(['token'])
}
export default store;

