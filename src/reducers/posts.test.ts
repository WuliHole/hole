import { Map, List } from 'immutable';

import fireAction from '../../test-utils/fire-action';
import postsReducer from '../reducers/posts';

import {
  UPDATE_POST_SUCCESS,
  CREATE_POST_SUCCESS,
  GET_POST_BY_ID_SUCCESS,
  GET_PUBLISHED_POST_FOR_USER_SUCCESS,

  UPDATE_POST_ERROR,
  CREATE_POST_ERROR,
  GET_POST_BY_ID_ERROR,
  GET_PUBLISHED_POST_FOR_USER_ERROR,

  CREATE_POST_PENDING,
  UPDATE_POST_PENDING,
  GET_POST_BY_ID_PENDING,
  GET_PUBLISHED_POST_FOR_USER_PENDING
} from '../../src/constants/posts.action.types';
import { debug } from '../utils/debug'
let state = postsReducer()

describe('Post Reducer', () => {

  describe('PENDING', () => {
    it('all state should be pending', () => {
      let localState = postsReducer()
      const s1 = fireAction(postsReducer, localState, CREATE_POST_PENDING)
      const s2 = fireAction(postsReducer, localState, GET_POST_BY_ID_PENDING)
      const s3 = fireAction(postsReducer, localState, GET_PUBLISHED_POST_FOR_USER_PENDING)
      const s4 = fireAction(postsReducer, localState, UPDATE_POST_PENDING)
      expect(s1.get('isLoading')).toBe(true)
      expect(s2.get('isLoading')).toBe(true)
      expect(s3.get('isLoading')).toBe(true)
      expect(s4.get('isLoading')).toBe(true)
    })
  })

  describe('Got Error', () => {
    it('all state should be hasError', () => {
      let localState = postsReducer()
      const s1 = fireAction(postsReducer, localState, CREATE_POST_ERROR)
      const s2 = fireAction(postsReducer, localState, GET_POST_BY_ID_ERROR)
      const s3 = fireAction(postsReducer, localState, GET_PUBLISHED_POST_FOR_USER_ERROR)
      const s4 = fireAction(postsReducer, localState, UPDATE_POST_ERROR)
      expect(s1.get('hasError')).toBe(true)
      expect(s2.get('hasError')).toBe(true)
      expect(s3.get('hasError')).toBe(true)
      expect(s4.get('hasError')).toBe(true)
    })
  })

  describe('CREATE_POST_SUCCESS', () => {
    it('meta size should be 1', () => {
      let post1 = mockResponse()
      state = fireAction(
        postsReducer, state, CREATE_POST_SUCCESS, post1
      )
      expect(state.get('meta').size).toEqual(1, state.toJS())
      expect(state.get('editing')).toEqual(post1.id, state.toJS())
    })

  })

  describe('UPDATE_POST_SUCCESS', () => {
    it('post should be update correctly when update_post_success', () => {
      let post2 = mockResponse()
      post2.title = 'newTitle'
      post2.createdAt = '2017-3-2'
      const newPost = post2
      const newState = fireAction(
        postsReducer, state, UPDATE_POST_SUCCESS, newPost
      )
      const newPosts = newState.get('meta').get(post2.id.toString())
      expect(newPosts.get('title')).toBe('newTitle', newState.toJS())
      expect(newPosts.get('createdAt')).toBe('2017-3-2', newState.toJS())
    })
  })

  describe('GET_POST_BY_ID_SUCCESS', () => {
    it('meta size  should be  increased 1', () => {
      let localState = postsReducer()
      let post2 = mockResponse()
      post2.title = 'newTitle'
      post2.createdAt = '2017-3-222'
      const newPost = post2
      const newState = fireAction(
        postsReducer, localState, GET_POST_BY_ID_SUCCESS, newPost
      )
      const newPosts = newState.get('meta').get(post2.id.toString())
      expect(newState.get('meta').size).toBe(localState.get('meta').size + 1)
      expect(newPosts.get('title')).toEqual('newTitle', newState.toJS())
      expect(newPosts.get('createdAt')).toEqual('2017-3-222', newState.toJS())
    })
  })

  describe('GET_USER_POSTS_SUCCESS', () => {
    it('meta size  should be  increased 6', () => {
      let localState = postsReducer()
      const newPost = {
        meta: [
          mockResponse(1),
          mockResponse(2),
          mockResponse(3),
          mockResponse(4),
          mockResponse(5),
          mockResponse(6)
        ]
      }
      const newState = fireAction(
        postsReducer, localState, GET_PUBLISHED_POST_FOR_USER_SUCCESS, newPost
      )
      expect(newState.get('meta').size).toBe(localState.get('meta').size + 6)
      expect(localState.get('total')).toBe(0)
      expect(newState.get('total')).toBe(6)
    })
  })

});


function mockResponse(id?: number): Post<any> {
  return {
    id: id || 255,
    title: 'hello',
    content: {
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
    createdAt: '',
    updatedAt: '',
    authorId: 25,
    author: {
      'avatar': 'http://images.yibencezi.com/FqSfRyyFKt0f5E7YyeLcxi1VkEMk',
      id: 201,
      name: '',
      nickName: '',
      verified: true,
      createdAt: '',
      bio: ''
    },
    published: true,
    upvoted: true,
    upvoteCount: 12
  }
}
