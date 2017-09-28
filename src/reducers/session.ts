import {
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,

  LOGOUT_USER_PENDING,
  LOGOUT_USER_ERROR,
  LOGOUT_USER_SUCCESS,

  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_ERROR,
  SIGNUP_USER_PENDING,

  SET_USER_PASSWORD_PENDING,
  SET_USER_PASSWORD_ERROR,
  SET_USER_PASSWORD_SUCCESS,

  UPDATE_USER_PENDING,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  ACCESS_TOKEN_REFRESH_SUCCESS,
} from '../constants';

import { fromJS } from 'immutable';
import { getCookie } from '../utils/cookie'
const INITIAL_STATE = fromJS({
  token: null,
  feedToken: null,
  user: undefined,
  hasError: false,
  isLoading: false,
  refreshToken: null
});

function sessionReducer(state = INITIAL_STATE,
  action = { type: '', payload: null }) {
  switch (action.type) {

    case SIGNUP_USER_PENDING:
    case LOGIN_USER_PENDING:
      return state.merge(fromJS({
        token: null,
        user: undefined,
        hasError: false,
        isLoading: true,
      }));

    case LOGIN_USER_SUCCESS:
      return state.merge(fromJS({
        token: action.payload.token,
        feedToken: action.payload.feedToken,
        refreshToken: action.payload.refreshTok,
        user: action.payload,
        hasError: false,
        isLoading: false,
      }));

    case SIGNUP_USER_ERROR:
    case LOGIN_USER_ERROR:
    case SET_USER_PASSWORD_ERROR:
    case UPDATE_USER_ERROR:
    case LOGOUT_USER_ERROR:
      return state.merge(fromJS({
        hasError: true,
        isLoading: false,
      }));

    case SET_USER_PASSWORD_PENDING:
    case LOGOUT_USER_PENDING:
    case UPDATE_USER_PENDING:
      return state.merge({
        isLoading: true
      })

    case SET_USER_PASSWORD_SUCCESS:
      return state.merge({
        isLoading: false,
        user: action.payload
      })

    case UPDATE_USER_SUCCESS:
      return state.merge({
        isLoading: false,
        user: action.payload
      })

    case LOGOUT_USER_SUCCESS:
      return state.merge(INITIAL_STATE);

    case ACCESS_TOKEN_REFRESH_SUCCESS:
      return state.merge({
        token: action.payload.token
      })

    default:
      return state;
  }
}

export default sessionReducer;
