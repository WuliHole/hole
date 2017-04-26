import { Map } from 'immutable';

import fireAction from '../../test-utils/fire-action';
import commentReducer from '../reducers/comment';

import {
  FETCH_COMMENT_ERROR,
  FETCH_COMMENT_PENDING,
  FETCH_COMMENT_SUCCESS,

  POST_COMMENT_ERROR,
  POST_COMMENT_PENDING,
  POST_COMMENT_SUCCESS
} from '../../src/constants/comment.action.types';

let state = commentReducer();

describe('Comment Reducer', () => {

  describe('on POST_COMMENT_PENDING', () => {
    it('should set loading to true', () => {
      state = fireAction(commentReducer, state, POST_COMMENT_PENDING);
      expect(state.get('isLoading')).toBe(true);
      expect(state.get('hasError')).toBe(false)
    });
  });

  describe('on POST_COMMENT_SUCCESS', () => {
    it('should have one comment', () => {
      const res = mockResponse()
      state = fireAction(
        commentReducer,
        state,
        POST_COMMENT_SUCCESS,
        res
      );

      expect(state.get('isLoading')).toBe(false);
      expect(state.get('hasError')).toBe(false);
      expect(state.get('comments').get(res.postId.toString())).toBeTruthy(state)
      expect(state.get('comments').get(
        res.postId.toString()).size
      ).toBe(1, state);
    });
  });

  describe('on POST_COMMENT_ERROR', () => {
    it('should has error', () => {
      state = fireAction(commentReducer, state, POST_COMMENT_ERROR);

      expect(state.get('isLoading')).toBe(false);
      expect(state.get('hasError')).toBe(true);
    });
  });


  describe('on FETCH_COMMENT_PENDING', () => {
    it('should be pending', () => {
      state = fireAction(commentReducer, state, FETCH_COMMENT_PENDING);
      expect(state.get('isLoading')).toBe(true);
      expect(state.get('hasError')).toBe(false)
    });
  });


  describe('on FETCH_COMMENT_SUCCESS', () => {
    it('should save one comment', () => {
      const res = mockResponse()
      state = fireAction(
        commentReducer,
        state,
        FETCH_COMMENT_SUCCESS,
        res
      );

      expect(state.get('isLoading')).toBe(false);
      expect(state.get('hasError')).toBe(false);
      expect(state.get('comments').get(res.postId.toString())).toBeTruthy(state)

      expect(
        state.get('comments').get(res.postId.toString()).size
      ).toBe(2, state.get(res.postId.toString()));
    });
  });

  describe('on FETCH_COMMENT_ERROR', () => {
    it('should has error', () => {
      state = fireAction(commentReducer, state, FETCH_COMMENT_ERROR);

      expect(state.get('isLoading')).toBe(false);
      expect(state.get('hasError')).toBe(true);
    });
  });

});


function mockResponse() {
  return {
    comment: {
      entityMap: {},
      blocks: [
        {
          key: 'bk1gc',
          text: 'asdasd',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        }]
    },
    id: 255,
    postId: 201,
    author: {
      'avatar': 'http://images.yibencezi.com/FqSfRyyFKt0f5E7YyeLcxi1VkEMk',
      'first': 'Super',
      'last': 'Dave',
      'id': '3dddazz'
    }
  }
}
