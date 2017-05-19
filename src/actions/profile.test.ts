import nock = require('fetch-mock')
import configureMockStore from 'redux-mock-store'
import {
  getProfile
} from './profile'
import { fromJS } from 'immutable'
import * as Types from '../constants/profile'
import { getContentState } from '../components/editor/utils/testUtils'
import { _getMiddleware } from '../store/configure-store'
import { reset } from 'redux-form'
const middlewares = _getMiddleware()
const mockStore = configureMockStore(middlewares)

describe('getProfile Async Actions', () => {

  it(' GET_PROFILE_SUCCESS  has been done', (done) => {
    const response = { $1234: 'test' }
    nock.get('*', response)

    const expectedActions = [
      { type: Types.GET_PROFILE_PENDING },
      {
        type: Types.GET_PROFILE_SUCCESS,
        payload: response,
        meta: undefined
      }
    ]

    const store = mockStore({
    })

    return store.dispatch(getProfile(25))
      .then((res) => {
        expect(store.getActions()).toEqual(expectedActions, res)
        nock.restore();
        done()
      })
  })


})

