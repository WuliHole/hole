import { login, signup } from '../api/auth/';
import {
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  FORM_RESET,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_ERROR,
  SIGNUP_USER_PENDING
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
            dispatch({
              type: FORM_RESET,
              form: 'login',
            });
            dispatch(closeModal())
            return res;
          }),
      },
    });
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}
