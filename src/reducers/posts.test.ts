import { Map } from 'immutable';

import fireAction from '../../test-utils/fire-action';
import postsReducer from '../reducers/posts';

import {
  UPDATE_POST_PENDING,
  UPDATE_POST_ERROR,
  UPDATE_POST_SUCCESS,
  CREATE_POST_SUCCESS
} from '../../src/constants/posts.action.types';
import { debug } from '../utils/debug'
let state = postsReducer()

describe('Post Reducer', () => {
  describe('CREATE_POST_SUCCESS', () => {
    it('meta size should be 1', () => {
      let post1 = mockResponse()
      const newState = fireAction(
        postsReducer, state, CREATE_POST_SUCCESS, post1
      )
      expect(newState.get('meta').size).toEqual(1, newState.toJS())
      expect(newState.get('editing')).toEqual(post1.id, newState.toJS())
    })

  })

  describe('UPDATE_POST_SUCCESS', () => {
    it('post should be update correctly when update_post_success', () => {
      let post2 = mockResponse()
      post2.title = 'newTitle'
      post2.createdAt = '2017-3-2'
      const newPost = Map(post2)
      const newState = fireAction(
        postsReducer, state, UPDATE_POST_SUCCESS, newPost
      )
      const newPosts = newState.get('meta').get(0)
      expect(newPost.get('title')).toEqual('newTitle', newState.toJS())
      expect(newPost.get('createdAt')).toEqual('2017-3-2', newState.toJS())
    })
  })
});


function mockResponse(): Post<any> {
  return {
    id: 255,
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
    author: {
      'avatar': 'http://images.yibencezi.com/FqSfRyyFKt0f5E7YyeLcxi1VkEMk',
      id: 201,
      name: '',
      nickName: '',
      verified: true,
      createdAt: '',
      bio: ''
    }
  }
}
