
import fireAction from '../../test-utils/fire-action';
import followReducer from './follow';
import { fromJS } from 'immutable'
import {
  GET_NEXT_USER_FOLLOWERS_ERROR,
  GET_NEXT_USER_FOLLOWERS_SUCCESS,
  GET_NEXT_USER_FOLLOWINGS_PENDING,

  GET_USER_FOLLOWERS_PENDING,
  GET_USER_FOLLOWERS_ERROR,
  GET_USER_FOLLOWERS_SUCCESS,

  GET_USER_FOLLOWINGS_ERROR,
  GET_USER_FOLLOWINGS_PENDING,
  GET_USER_FOLLOWINGS_SUCCESS,

  ADD_FOLLOWER_FOR_USER,
  ADD_FOLLOWING_FOR_USER,
  REMOVE_FOLLOWER_FOR_USER,
  REMOVE_FOLLOWING_FOR_USER
} from '../../src/constants/follow.action.types';



describe('Follow Reducer', () => {

  describe('on  GET_NEXT_USER_FOLLOWINGS_PENDING', () => {
    it('should set loading to true', () => {
      const s1 = fireAction(followReducer, followReducer(), GET_NEXT_USER_FOLLOWINGS_PENDING);
      expect(s1.get('isLoading')).toBe(true, s1)
    });
  });

  describe('on GET_NEXT_USER_FOLLOWERS_SUCCESS', () => {
    it('should  rightly  add followers', () => {
      const res = {
        next: 'http://google.com',
        followers: ['4', '2', '3'],
        id: 1
      }

      const state = fireAction(
        followReducer,
        followReducer(),
        GET_NEXT_USER_FOLLOWERS_SUCCESS,
        res
      ).toJS()

      expect(state.isLoading).toBe(false)
      expect(state.followers[1].followers).toEqual(res.followers, state.followers[1])
      expect(state.followers[1].next).toEqual(res.next, state.followers)
    });

    it('it should rightly append followers', () => {
      const res = {
        next: ' ',
        followers: ['4', '2', '3'],
        id: 1
      }
      const state = fireAction(
        followReducer,
        fromJS({}).setIn(['followers', 1, 'followers'], fromJS(['5', '6', '7'])),
        GET_NEXT_USER_FOLLOWERS_SUCCESS,
        res
      ).toJS()

      expect(state.followers[1].followers).toEqual(['5', '6', '7'].concat(res.followers), state.followers[1])
    })
  });


  describe('on ADD_FOLLOWER_FOR_USER', () => {
    describe('should rightly increase followers for user', () => {
      it('recorded : should push it in  ', () => {
        const res = {
          followerId: 3,
          id: 1
        }

        const state = fireAction(
          followReducer,
          fromJS({}).setIn(['followers', 1, 'followers'], fromJS(['5', '6', '7'])),
          ADD_FOLLOWER_FOR_USER,
          res
        ).toJS()

        expect(state.followers[1].followers.length).toEqual(4)
        expect(state.followers[1].followers).toEqual(['5', '6', '7', '3'], state.followers[1])
      })

      it(' not yet recorded : length of followers should be 1', () => {
        const res = {
          followerId: 3,
          id: 1
        }

        const state = fireAction(
          followReducer,
          followReducer(),
          ADD_FOLLOWER_FOR_USER,
          res
        ).toJS()

        expect(state.followers[1].followers.length).toEqual(1)
        expect(state.followers[1].followers).toEqual(['3'], state.followers[1])
      })
    })
  })

  describe('on REMOVE_FOLLOWER_FOR_USER', () => {
    describe('should rightly remove followers for user', () => {
      it('recorded : should filter it  ', () => {
        const res = {
          followerId: 6,
          id: 1
        }

        const state = fireAction(
          followReducer,
          fromJS({}).setIn(['followers', 1, 'followers'], fromJS(['5', '6', '7'])),
          REMOVE_FOLLOWER_FOR_USER,
          res
        ).toJS()

        expect(state.followers[1].followers.length).toEqual(2)
        expect(state.followers[1].followers).toEqual(['5', '7'], state.followers[1])
      })

      it(' not yet recorded : length of followers should be 0', () => {
        const res = {
          followerId: 3,
          id: 1
        }

        const state = fireAction(
          followReducer,
          followReducer(),
          REMOVE_FOLLOWER_FOR_USER,
          res
        ).toJS()

        expect(state.followers[1].followers.length).toEqual(0)
        expect(state.followers[1].followers).toEqual([], state.followers[1])
      })
    })
  })

  describe('on ADD_FOLLOWING_FOR_USER', () => {
    describe('should rightly increase followings for user', () => {
      it('recorded : should push it in  ', () => {
        const res = {
          followingId: 3,
          id: 1
        }

        const state = fireAction(
          followReducer,
          fromJS({}).setIn(['followings', 1, 'followings'], fromJS(['5', '6', '7'])),
          ADD_FOLLOWING_FOR_USER,
          res
        ).toJS()

        expect(state.followings[1].followings.length).toEqual(4)
        expect(state.followings[1].followings).toEqual(['5', '6', '7', '3'], state.followings[1])
      })

      it(' not yet recorded : length of followings should be 1', () => {
        const res = {
          followingId: 3,
          id: 1
        }

        const state = fireAction(
          followReducer,
          followReducer(),
          ADD_FOLLOWING_FOR_USER,
          res
        ).toJS()

        expect(state.followings[1].followings.length).toEqual(1)
        expect(state.followings[1].followings).toEqual(['3'], state.followings[1])
      })
    })
  })

  describe('on REMOVE_FOLLOWING_FOR_USER', () => {
    describe('should rightly remove followings for user', () => {
      it('recorded : should filter it  ', () => {
        const res = {
          followingId: 6,
          id: 1
        }

        const state = fireAction(
          followReducer,
          fromJS({}).setIn(['followings', 1, 'followings'], fromJS(['5', '6', '7'])),
          REMOVE_FOLLOWING_FOR_USER,
          res
        ).toJS()

        expect(state.followings[1].followings.length).toEqual(2)
        expect(state.followings[1].followings).toEqual(['5', '7'], state.followings[1])
      })

      it(' not yet recorded : length of followings should be 0', () => {
        const res = {
          followingId: 3,
          id: 1
        }

        const state = fireAction(
          followReducer,
          followReducer(),
          REMOVE_FOLLOWING_FOR_USER,
          res
        ).toJS()

        expect(state.followings[1].followings.length).toEqual(0)
        expect(state.followings[1].followings).toEqual([], state.followings[1])
      })
    })
  })
});

