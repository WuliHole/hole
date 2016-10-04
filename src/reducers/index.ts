import { combineReducers } from 'redux';
const { routerReducer } = require('react-router-redux');
const formReducer = require('redux-form').reducer;
import counter from './counter';
import session from './session';
import modal from './modal';
import article from './article'
const rootReducer = combineReducers({
  session,
  counter,
  modal,
  article,
  routing: routerReducer,
  form: formReducer,
});

export default rootReducer;
