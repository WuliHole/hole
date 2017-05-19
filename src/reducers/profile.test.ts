import { Map, List } from 'immutable';

import fireAction from '../../test-utils/fire-action';
import profileReducer from '../reducers/profile';

import {
  GET_PROFILE_ERROR,
  GET_PROFILE_PENDING,
  GET_PROFILE_SUCCESS
} from '../../src/constants/profile';
import { debug } from '../utils/debug'

describe('Post Reducer', () => {

  describe('PENDING', () => {
    it('all state should be pending', () => {
      let localState = profileReducer()
      const s1 = fireAction(profileReducer, localState, GET_PROFILE_PENDING)
      expect(s1.get('isLoading')).toBe(true)
    })
  })

  describe('Error', () => {
    it('all state should has error and error message', () => {
      let localState = profileReducer()
      expect(localState.get('errMsg')).toBe(null)

      const errMsg1 = 'unexcept value'
      const s1 = fireAction(profileReducer, localState, GET_PROFILE_ERROR, {
        message: errMsg1
      })
      expect(s1.get('hasError')).toBe(true)
      expect(s1.get('errMsg')).toBe(errMsg1)
    })
  })

  describe('GET_PROFILE_SUCCESS', () => {
    const user: User = {
      nickName: 'You',
      bio: 'Karma v1.6',
      name: 'reducer test',
      createdAt: 'now',
      verified: true,
      avatar: '~~~~',
      id: 25
    }

    it('meta size should +1', () => {
      let localState = profileReducer()
      const errMsg1 = 'unexcept value'
      const s1 = fireAction(
        profileReducer, localState, GET_PROFILE_SUCCESS, user)
      expect(s1.get('hasError')).toBe(false)
      expect(s1.get('errMsg')).toBe(null)
      expect(localState.get('meta').size).toBe(0)
      expect(s1.get('meta').size).toBe(1)
    })

    it('if user exist, should update info ,not override', () => {
      let localState = profileReducer()
      const s1 = fireAction(
        profileReducer,
        localState,
        GET_PROFILE_SUCCESS,
        user
      )
      const newInfo = {
        name: 'newName',
        bio: 'testbio',
        nickName: 'success'
      }
      const usr1 = Object.assign({}, user, newInfo)
      const s2 = fireAction(
        profileReducer,
        s1,
        GET_PROFILE_SUCCESS,
        usr1
      )
      expect(s1.get('meta').size).toBe(1)
      expect(s2.get('meta').size).toBe(1)
      expect(s2.get('meta')
        .getIn([`${user.id}`, 'name']))
        .toBe(newInfo.name, s2.toJS())
      expect(s2.get('meta')
        .getIn([`${user.id}`, 'nickName']))
        .toBe(newInfo.nickName)
      expect(s2.get('meta', s2.toJS())
        .getIn([`${user.id}`, 'bio']))
        .toBe(newInfo.bio, s2.toJS())
    })
  })
})
