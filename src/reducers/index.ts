import { combineReducers } from 'redux';
const { routerReducer } = require('react-router-redux');
const formReducer = require('redux-form').reducer;
import session from './session';
import modal from './modal';
import article from './article'
const rootReducer = combineReducers({
  session,
  modal,
  article,
  routing: routerReducer,
  form: formReducer,
});

export default rootReducer;
