import 'babel-polyfill';

import 'ts-helpers';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import progress from 'app/components/progress/index'
const { Provider } = require('react-redux');
const { Router, browserHistory } = require('react-router');
const { syncHistoryWithStore } = require('react-router-redux');

import routes from './store/routes';
import store from './store/configure-store';

import './styles/index.css';
import './styles/index.less';
if (__DEV__) {
  const Perf = require('react-addons-perf')
  window['Perf'] = Perf
}

declare const __TEST__: boolean;

const history = syncHistoryWithStore(browserHistory, store);
if (!__TEST__) {
  ReactDOM.render(
    <div>
      <Provider store={ store }>
        { routes(history) }
      </Provider>
    </div>,
    document.getElementById('root')
  );
}
