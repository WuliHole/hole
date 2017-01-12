import nock = require('fetch-mock')
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getComment, postComment } from './comment'
import { fromJS } from 'immutable'
import * as Types from '../constants/comment.action.types'
import { getContentState } from '../components/editor/utils/testUtils'
import { _getMiddleware } from '../store/configure-store'
const middlewares = _getMiddleware()
const mockStore = configureMockStore(middlewares)

describe('Comment Async Actions', () => {

  it(' FETCH_COMMENT_SUCCESS  has been done', (done) => {
    const response = { '2z3cmk': '666666' }
    nock.get('*', response)

    const expectedActions = [
      { type: Types.FETCH_COMMENT_PENDING },
      {
        type: Types.FETCH_COMMENT_SUCCESS,
        payload: response,
        meta: undefined
      }
    ]

    const store = mockStore(fromJS({
      articleList: [],
      hasError: false,
      isLoading: false,
    }))

    return store.dispatch(getComment({ postId: '2dzikl' }))
      .then((res) => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions, res)
        nock.restore();
        done()
      })
  })

  it('POST_COMMENT_SUCCESS  has been done', (done) => {
    const response = {
      success: true,
      payload: {
        meta: getContentState('test comment')
      }
    }

    nock.post('*', response)

    const expectedActions = [
      { type: Types.POST_COMMENT_PENDING },
      {
        type: Types.POST_COMMENT_SUCCESS,
        payload: response,
        meta: undefined
      }
    ]

    const store = mockStore(fromJS({
      articleList: [],
      hasError: false,
      isLoading: false,
    }))

    return store.dispatch(postComment({
      postId: '2dzikl',
      content: getContentState('test comment'),
      authorId: 'zimmkl'
    }))
      .then((res) => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions, res)
        nock.restore();
        done()
      })
  })
})
