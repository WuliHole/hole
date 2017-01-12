import nock = require('fetch-mock')
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { updateArticleList } from './article'
import { fromJS } from 'immutable'
import {
  FETCH_ARTICLE_LIST_PENDING,
  FETCH_ARTICLE_LIST_SUCCESS,
  FETCH_ARTICLE_LIST_ERROR
} from '../constants/article.action.types'
import { _getMiddleware } from '../store/configure-store'
const middlewares = _getMiddleware()
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {

  it('creates FETCH_ARTICLE_LIST_SUCCESS  has been done', (done) => {
    const response = { hello: 'world' }
    nock.post('*', response)

    const expectedActions = [
      { type: FETCH_ARTICLE_LIST_PENDING },
      {
        type: FETCH_ARTICLE_LIST_SUCCESS,
        payload: response,
        meta: undefined
      }
    ]

    const store = mockStore(fromJS({
      articleList: [],
      hasError: false,
      isLoading: false,
    }))

    return store.dispatch(updateArticleList())
      .then((res) => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions, res)
        nock.restore();
        done()
      })
  })
})
