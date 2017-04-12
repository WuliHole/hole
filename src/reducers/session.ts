import {
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,

  LOGOUT_USER,

  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_ERROR,
  SIGNUP_USER_PENDING,

  SET_USER_PASSWORD_PENDING,
  SET_USER_PASSWORD_ERROR,
  SET_USER_PASSWORD_SUCCESS,

  UPDATE_USER_PENDING,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS
} from '../constants';

import { fromJS } from 'immutable';
import { getCookie } from '../utils/cookie'
const INITIAL_STATE = fromJS({
  token: null,
  user: {},
  hasError: false,
  isLoading: false,
});

function sessionReducer(state = INITIAL_STATE,
  action = { type: '', payload: null }) {
  switch (action.type) {

    case SIGNUP_USER_PENDING:
    case LOGIN_USER_PENDING:
      return state.merge(fromJS({
        token: null,
        user: {},
        hasError: false,
        isLoading: true,
      }));

    case LOGIN_USER_SUCCESS:
      return state.merge(fromJS({
        token: getCookie('uid'),
        user: action.payload,
        hasError: false,
        isLoading: false,
      }));

    case SIGNUP_USER_ERROR:
    case LOGIN_USER_ERROR:
    case SET_USER_PASSWORD_ERROR:
    case UPDATE_USER_ERROR:
      return state.merge(fromJS({
        hasError: true,
        isLoading: false,
      }));

    case SET_USER_PASSWORD_PENDING:
    case UPDATE_USER_PENDING:
      return state.merge({
        isLoading: true
      })

    case SET_USER_PASSWORD_SUCCESS:
      return state.merge({
        isLoading: false,
        ...action.payload
      })

    case UPDATE_USER_SUCCESS:
      return state.merge({
        isLoading: false,
        user: action.payload
      })

    case LOGOUT_USER:
      return state.merge(INITIAL_STATE);

    default:
      return state;
  }
}

export default sessionReducer;
