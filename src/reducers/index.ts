import { combineReducers } from 'redux';
const { routerReducer } = require('react-router-redux');
const formReducer = require('redux-form').reducer;
import session from './session';
import modal from './modal';
import article from './article'
import comment from './comment'
import profile from './profile'
import posts from './posts'
const rootReducer = combineReducers({
  session,
  profile,
  posts,
  modal,
  article,
  comment,
  routing: routerReducer,
  form: formReducer,
});

export default rootReducer;
