import { Map } from 'immutable';

import fireAction from '../../test-utils/fire-action';
import sessionReducer from '../reducers/session';

import {
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_PENDING
} from '../../src/constants/index';

let state = sessionReducer();

describe('Session Reducer', () => {
  describe('inital state', () => {
    it('should be a Map', () => {
      expect(Map.isMap(state)).toBe(true);
    });
  });

  describe('on LOGIN_USER_PENDING', () => {
    it('should set loading to true', () => {
      state = fireAction(sessionReducer, state, LOGIN_USER_PENDING);
      expect(state.get('isLoading')).toBe(true);
      expect(state.get('token')).toBeNull();
    });
  });

  describe('on LOGIN_USER_SUCCESS', () => {
    it('should save the username and bio', () => {
      state = fireAction(
        sessionReducer,
        state,
        LOGIN_USER_SUCCESS,
        { bio: 'abc', name: 'abc@test.com' });

      expect(state.get('isLoading')).toBe(false);
      expect(state.get('hasError')).toBe(false);
      expect(state.getIn(['user', 'bio'])).toBe('abc');
      expect(state.getIn(['user', 'name'])).toBe('abc@test.com');
    });
  });

  describe('on LOGIN_USER_ERROR', () => {
    it('should has Error', () => {
      state = fireAction(sessionReducer, state, LOGIN_USER_ERROR);

      expect(state.get('isLoading')).toBe(false);
      expect(state.get('hasError')).toBe(true);
    });
  });


  describe('on LOGOUT_USER', () => {
    it('should save the username', () => {
      state = fireAction(sessionReducer, state, LOGOUT_USER);

      expect(state.get('isLoading')).toBe(false);
      expect(state.get('hasError')).toBe(false);
      expect(state.get('token')).toBeNull();
      expect(state.get('user')).toBe(undefined);
    });
  });

  describe('on UPDATE_USER', () => {

    it('should has Error', () => {
      state = fireAction(sessionReducer, state, UPDATE_USER_ERROR)
      expect(state.get('isLoading')).toBe(false);
      expect(state.get('hasError')).toBe(true);
    })

    it('should update the session.user success', () => {
      let localState = sessionReducer();
      const user: User = {
        nickName: 'newName',
        name: '',
        id: 25,
        bio: 'test bio ',
        createdAt: '',
        verified: true,
        avatar: 'pppppp'
      }

      localState = fireAction(
        sessionReducer,
        localState,
        UPDATE_USER_SUCCESS,
        user
      )
      expect(localState.get('isLoading')).toBe(false)
      expect(localState.get('hasError')).toBe(false)
      expect(localState.get('token')).toBeNull()
      expect(localState.getIn(['user', 'nickName'])).toBe(user.nickName)
      expect(localState.getIn(['user', 'name'])).toBe(user.name)
      expect(localState.getIn(['user', 'id'])).toBe(user.id)
      expect(localState.getIn(['user', 'avatar'])).toBe(user.avatar)
      expect(localState.getIn(['user', 'bio'])).toBe(user.bio)
    });
  });
});
