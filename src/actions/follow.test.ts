import nock = require('fetch-mock')
import { fromJS } from 'immutable'
import { CREATE_USER_INFO } from 'app/constants/profile'
import configureMockStore from 'redux-mock-store'
import { _getMiddleware } from '../store/configure-store'
const middlewares = _getMiddleware()
const mockStore = configureMockStore(middlewares)

import {
  addFollowerForUser,
  addFollowingForUser,
  removeFollowerForUser,
  removeFollowingForUser,
  getFollowers

} from './follow'

import {
  ADD_FOLLOWER_FOR_USER,
  ADD_FOLLOWING_FOR_USER,
  REMOVE_FOLLOWER_FOR_USER,
  REMOVE_FOLLOWING_FOR_USER,

  GET_USER_FOLLOWERS_PENDING,
  GET_USER_FOLLOWERS_SUCCESS
} from '../constants/follow.action.types'

describe('Follow actions', () => {

  it('should add follower for user', () => {
    expect(addFollowerForUser(1, 3)).toEqual({
      type: ADD_FOLLOWER_FOR_USER,
      payload: {
        id: 1,
        followerId: 3
      }
    })
  })



  it('should remove follower for user', () => {
    expect(removeFollowerForUser(1, 3)).toEqual({
      type: REMOVE_FOLLOWER_FOR_USER,
      payload: {
        id: 1,
        followerId: 3
      }
    })
  })

  it('should add following for user', () => {
    expect(addFollowingForUser(1, 3)).toEqual({
      type: ADD_FOLLOWING_FOR_USER,
      payload: {
        id: 1,
        followingId: 3
      }
    })
  })

  it('should remove following for user', () => {
    expect(removeFollowingForUser(1, 3)).toEqual({
      type: REMOVE_FOLLOWING_FOR_USER,
      payload: {
        id: 1,
        followingId: 3
      }
    })
  })

  it('GET_USER_FOLLOWERS_SUCCESS has been done', (done) => {
    const response = {
      followers: {
        1: {},
        2: {},
        5: {},
        7: {}
      },
      next: 'http://google.com'
    }
    const uid = 1
    nock.get('*', response)

    const expectedActions = [
      { type: GET_USER_FOLLOWERS_PENDING },
      {
        type: CREATE_USER_INFO,
        payload: { users: response.followers }
      },
      {
        type: GET_USER_FOLLOWERS_SUCCESS,
        payload: {
          followers: ['1', '2', '5', '7'],
          next: response.next,
          id: uid
        },
        meta: undefined
      }
    ]

    const store = mockStore(fromJS({
    }))

    return store.dispatch(getFollowers({ uid }))
      .then((res) => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions, res)
        nock.restore();
        done()
      })
  })

})
