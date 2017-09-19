import { combineReducers } from 'redux';
import routerReducer from './routeReducer'
import { reducer as formReducer } from 'redux-form'
import session from './session';
import modal from './modal';
import comment from './comment'
import profile from './profile'
import posts from './posts'
import toast from './toast'
import notification from './notification'
const rootReducer = combineReducers<any>({
  session,
  profile,
  posts,
  modal,
  comment,
  toast,
  notification,
  routing: routerReducer,
  form: formReducer,
} as any);

export default rootReducer;
