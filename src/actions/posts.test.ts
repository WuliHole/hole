import nock = require('fetch-mock')
import configureMockStore from 'redux-mock-store'
import {
  getById,
  getUserPosts,
  update,
  create
} from './posts'
import { fromJS } from 'immutable'
import * as Types from '../constants/posts.action.types'
import { getContentState } from '../components/editor/utils/testUtils'
import { _getMiddleware } from '../store/configure-store'
import { reset } from 'redux-form'
import { EditorState } from 'draft-js'
const middlewares = _getMiddleware()
const mockStore = configureMockStore(middlewares)

describe('GetUserPosts Async Actions', () => {

  it(' GET_USER_POSTS_SUCCESS  has been done', (done) => {
    const response = {}
    nock.get('*', response)

    const expectedActions = [
      { type: Types.GET_USER_POSTS_PENDING },
      {
        type: Types.GET_USER_POSTS_SUCCESS,
        payload: response,
        meta: undefined
      }
    ]

    const store = mockStore({
    })

    return store.dispatch(getUserPosts(25))
      .then((res) => {
        expect(store.getActions()).toEqual(expectedActions, res)
        nock.restore();
        done()
      })
  })
})


describe('GetPostById Async Actions', () => {

  it(' GET_POST_BY_ID_SUCCESS  has been done', (done) => {
    const response = {}
    nock.get('*', response)

    const expectedActions = [
      { type: Types.GET_POST_BY_ID_PENDING },
      {
        type: Types.GET_POST_BY_ID_SUCCESS,
        payload: response,
        meta: undefined
      }
    ]

    const store = mockStore({
    })

    return store.dispatch(getById(25))
      .then((res) => {
        expect(store.getActions()).toEqual(expectedActions, res)
        nock.restore();
        done()
      })
  })
})


describe('Create Post Async Actions', () => {

  it(' CREATE_POST_SUCCESS  has been done', (done) => {
    const response = {}
    nock.post('*', response)

    const expectedActions = [
      { type: Types.CREATE_POST_PENDING },
      {
        type: Types.CREATE_POST_SUCCESS,
        payload: response,
        meta: undefined
      }
    ]

    const store = mockStore({
    })
    return store.dispatch(create())
      .then((res) => {
        expect(store.getActions()).toEqual(expectedActions, res)
        nock.restore();
        done()
      })
  })
})



describe('Update Post Async Actions', () => {

  it(' UPDATE_POST_SUCCESS  has been done', (done) => {
    const response = {}
    nock.put('*', response)

    const expectedActions = [
      { type: Types.UPDATE_POST_PENDING },
      {
        type: Types.UPDATE_POST_SUCCESS,
        payload: response,
        meta: undefined
      }
    ]

    const store = mockStore({
    })
    const content = EditorState.createEmpty().getCurrentContent()
    return store.dispatch(update(25, content))
      .then((res) => {
        expect(store.getActions()).toEqual(expectedActions, res)
        nock.restore();
        done()
      })
  })
})
