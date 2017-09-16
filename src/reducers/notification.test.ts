
import fireAction from '../../test-utils/fire-action';
import notificationReducer from './notification';

import {
  INITIAL_LOAD_NOTIFICATIONS_ERROR,
  INITIAL_LOAD_NOTIFICATIONS_PENDING,
  INITIAL_LOAD_NOTIFICATIONS_SUCCESS,

  LOAD_NEXT_NOTIFICATIONS_PENDING,
  LOAD_NEXT_NOTIFICATIONS_ERROR,
  LOAD_NEXT_NOTIFICATIONS_SUCCESS
} from '../../src/constants/feed.action.types';



describe('Notification Reducer', () => {

  describe('on  INITIAL_LOAD_NOTIFICATIONS_PENDING', () => {
    it('should set loading to true', () => {
      const s1 = fireAction(notificationReducer, notificationReducer(), INITIAL_LOAD_NOTIFICATIONS_PENDING);
      expect(s1.fetching).toBe(true, s1)
    });
  });

  describe('on INITIAL_LOAD_NOTIFICATIONS_SUCCESS', () => {
    it('should have one comment', () => {
      const res = { data: [1, 2, 3] }
      const state = fireAction(
        notificationReducer,
        notificationReducer(),
        INITIAL_LOAD_NOTIFICATIONS_SUCCESS,
        res
      );
      expect(state.fetching).toBe(false, state)
      expect(state.data).toEqual(res.data, state)
    });
  });

  describe('on INITIAL_LOAD_NOTIFICATIONS_ERROR', () => {
    it('should has error', () => {
      const state = fireAction(notificationReducer, notificationReducer(), INITIAL_LOAD_NOTIFICATIONS_ERROR);
      expect(state.fetching).toBe(false);
    });
  });


  describe('on LOAD_NEXT_NOTIFICATIONS_PENDING', () => {
    it('feching should be true', () => {
      const state = fireAction(notificationReducer, notificationReducer(), LOAD_NEXT_NOTIFICATIONS_PENDING);
      expect(state.fetching).toBe(true);
    });
  });


  describe('on LOAD_NEXT_NOTIFICATIONS_SUCCESS', () => {
    it('should rightly concat data', () => {
      const res = { data: [1, 2, 3] }
      const oldState = { data: [4, 4, 1, 3.5] }
      const state = fireAction(
        notificationReducer,
        oldState,
        LOAD_NEXT_NOTIFICATIONS_SUCCESS,
        res
      );

      expect(state.data).toEqual(oldState.data.concat(res.data))
    });
  });

  describe('on LOAD_NEXT_NOTIFICATIONS_ERROR', () => {
    it('feching should be false', () => {
      const state = fireAction(notificationReducer, notificationReducer(), LOAD_NEXT_NOTIFICATIONS_ERROR);
      expect(state.fetching).toBe(false);
    });
  });

});

