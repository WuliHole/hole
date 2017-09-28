import assert from '../utils/assert'
import { login, signup, logout, refreshToken } from '../api/auth/';
import {
  setPassword as setUserPassword,
  update
} from '../api/user'
import { getHeaderForJWT } from '../api/server/index'
import {
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER_PENDING,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  FORM_RESET,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_ERROR,
  SIGNUP_USER_PENDING,

  SET_USER_PASSWORD_PENDING,
  SET_USER_PASSWORD_SUCCESS,
  SET_USER_PASSWORD_ERROR,

  UPDATE_USER_PENDING,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,

  ACCESS_TOKEN_REFRESH_PENDING,
  ACCESS_TOKEN_REFRESH_SUCCESS,
  ACCESS_TOKEN_REFRESH_ERROR,
} from '../constants';
import { closeModal } from './modal';

export function signUpUser() {
  return (dispatch, getState) => {
    const email = getState().form.signup.email.value

    return dispatch({
      types: [
        SIGNUP_USER_PENDING,
        SIGNUP_USER_SUCCESS,
        SIGNUP_USER_ERROR
      ],
      payload: {
        promise: signup(email)
          .then(res => {
            dispatch({
              type: FORM_RESET,
              form: 'signup'
            })
            return res
          })
      }
    })
  }
}

export function loginUser() {
  return (dispatch, getState) => {
    const user = {
      username: getState().form.login.username.value,
      password: getState().form.login.password.value,
    };

    return dispatch({
      types: [
        LOGIN_USER_PENDING,
        LOGIN_USER_SUCCESS,
        LOGIN_USER_ERROR,
      ],
      payload: {
        promise: login(user)
          .then((res) => {
            return res;
          }),
      },
    });
  };
}

export function setPassword() {
  return (dispatch, getState) => {
    const password = getState().form.setPassword.password.value

    return dispatch({
      types: [
        SET_USER_PASSWORD_PENDING,
        SET_USER_PASSWORD_SUCCESS,
        SET_USER_PASSWORD_ERROR,
      ],
      payload: {
        promise: setUserPassword(password)
      },
    });
  }
}

export function updateUserInfo(formName: string) {
  return (dispatch, getState) => {
    const form = getState().form[formName]
    const data = {}

    for (let filed in form) {
      if (filed.startsWith('_')) {
        continue
      }
      if (form[filed].value) {
        data[filed] = form[filed].value
      }
    }

    return dispatch({
      types: [
        UPDATE_USER_PENDING,
        UPDATE_USER_SUCCESS,
        UPDATE_USER_ERROR,
      ],
      payload: {
        promise: update(data)
      },
    });
  }
}

export function logoutUser() {
  return (dispatch, getState) => {
    const refreshTok = getState().session.getIn(['refreshToken'])
    return dispatch({
      types: [
        LOGOUT_USER_PENDING,
        LOGOUT_USER_SUCCESS,
        LOGOUT_USER_ERROR
      ],
      payload: {
        promise: logout(refreshTok)
      }
    })
  }
}

export function accessTokenRefresh(token: string) {
  return (dispatch) => {
    return dispatch({
      types: [
        ACCESS_TOKEN_REFRESH_PENDING,
        ACCESS_TOKEN_REFRESH_SUCCESS,
        ACCESS_TOKEN_REFRESH_ERROR
      ],
      payload: {
        promise: refreshToken(token).then(res => res)
      }
    })
  }
}
