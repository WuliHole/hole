import nock = require('fetch-mock')
import configureMockStore from 'redux-mock-store'
import * as Types from '../constants/feed.action.types'
import { _getMiddleware } from '../store/configure-store'
import { initialLoadNotifications, loadNextNotifications } from './notification'
const middlewares = _getMiddleware()
const mockStore = configureMockStore(middlewares)

describe('Notification   Actions', () => {

  it(' initialLoadNotifications  has been done', (done) => {
    const response = { data: [1, 2, 3] }
    nock.get('*', response)

    const expectedActions = [
      { type: Types.INITIAL_LOAD_NOTIFICATIONS_PENDING },
      {
        type: Types.INITIAL_LOAD_NOTIFICATIONS_SUCCESS,
        payload: response,
        meta: undefined
      }
    ]

    const store = mockStore({
    })

    return store.dispatch(initialLoadNotifications(1, '2333'))
      .then((res) => {
        expect(store.getActions()).toEqual(expectedActions, res)
        nock.restore();
        done()
      })
  })


})

