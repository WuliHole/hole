import nock = require('fetch-mock')
import configureMockStore from 'redux-mock-store'
import {
  signUpUser,
  loginUser,
  setPassword,
  update,
  logoutUser
} from './session'
import { fromJS } from 'immutable'
import * as Types from '../constants'
import { getContentState } from '../components/editor/utils/testUtils'
import { _getMiddleware } from '../store/configure-store'
import { reset } from 'redux-form'
const middlewares = _getMiddleware()
const mockStore = configureMockStore(middlewares)

describe('signup Async Actions', () => {

  it(' SIGNUP_USER_SUCCESS  has been done', (done) => {
    const response = { $1234: 'test' }
    nock.post('*', response)

    const expectedActions = [
      { type: Types.SIGNUP_USER_PENDING },
      { type: 'redux-form/RESET', form: 'signup' },
      {
        type: Types.SIGNUP_USER_SUCCESS,
        payload: response,
        meta: undefined
      }
    ]

    const store = mockStore({
      form: {
        signup: {
          email: {
            value: 'test@test.com'
          }
        }
      }
    })

    return store.dispatch(signUpUser())
      .then((res) => {
        expect(store.getActions()).toEqual(expectedActions, res)
        nock.restore();
        done()
      })
  })


})

describe('LOGIN_USER async actions', () => {
  it('LOGIN_USER_SUCCESS  has been done', (done) => {
    const response: User = {
      name: '',
      nickName: '',
      avatar: 'rcooooo',
      id: 1234,
      verified: true,
      bio: 'good man',
      createdAt: '',
    }

    nock.post('*', response)

    const expectedActions = [
      { type: Types.LOGIN_USER_PENDING },
      {
        type: Types.LOGIN_USER_SUCCESS,
        payload: response,
        meta: undefined
      }
    ]

    const store = mockStore({
      form: {
        login: {
          username: {
            value: '123456'
          },
          password: {
            value: '666666'
          }
        }
      }
    })

    return store.dispatch(loginUser())
      .then((res) => {
        expect(store.getActions()).toEqual(expectedActions, res)
        nock.restore();
        done()
      })
  })
})

describe('SET_USER_PASSWORD Async Actions', () => {
  it('SET_USER_PASSWORD_SUCCESS  has been done', (done) => {
    const response: User = {
      name: '',
      nickName: '',
      avatar: 'rcooooo',
      id: 1234,
      verified: true,
      bio: 'good man',
      createdAt: '',
    }

    nock.post('*', response)

    const expectedActions = [
      { type: Types.SET_USER_PASSWORD_PENDING },
      {
        type: Types.SET_USER_PASSWORD_SUCCESS,
        payload: response,
        meta: undefined
      }
    ]

    const store = mockStore({
      form: {
        setPassword: {
          password: {
            value: '*******'
          }
        }
      }
    })

    return store.dispatch(setPassword())
      .then((res) => {
        expect(store.getActions()).toEqual(expectedActions, res)
        nock.restore();
        done()
      })
  })
})

describe('Update user Async Actions', () => {
  it('UPDATE_USER_SUCCESS  has been done', (done) => {
    const response: User = {
      name: '',
      nickName: '',
      avatar: 'rcooooo',
      id: 1234,
      verified: true,
      bio: 'good man',
      createdAt: '',
    }

    nock.put('*', response)

    const expectedActions = [
      { type: Types.UPDATE_USER_PENDING },
      {
        type: Types.UPDATE_USER_SUCCESS,
        payload: response,
        meta: undefined
      }
    ]

    const store = mockStore({
      form: {
        update: {
          bio: {
            value: 'I spend a alot of time on this'
          }
        }
      }
    })

    return store.dispatch(update('update'))
      .then((res) => {
        expect(store.getActions()).toEqual(expectedActions, res)
        nock.restore();
        done()
      })
  })
})


describe('Logout Async Action', () => {
  it('logout success', (done) => {
    const response = {}
    nock.get('*', response)

    const expectedActions = [
      { type: Types.LOGOUT_USER_PENDING },
      {
        type: Types.LOGOUT_USER_SUCCESS,
        payload: response,
        meta: undefined
      },
    ]
    const store = mockStore({})
    return store.dispatch(logoutUser())
      .then(res => {
        expect(store.getActions()).toEqual(expectedActions, res)
        nock.restore()
        done()
      })
  })
})
