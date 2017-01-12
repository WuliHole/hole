import {
  FETCH_COMMENT_ERROR,
  FETCH_COMMENT_PENDING,
  FETCH_COMMENT_SUCCESS,

  POST_COMMENT_ERROR,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_PENDING,

} from '../constants/comment.action.types'

import { fromJS, List, Map } from 'immutable'

const INITIAL_STATE = fromJS({
  comments: {},
  hasError: false,
  isLoading: false,
  lastActionType: ''
})

function commentReducer(state = INITIAL_STATE,
  action = { type: '', payload: null }) {
  switch (action.type) {

    case FETCH_COMMENT_PENDING:
    case POST_COMMENT_PENDING:
      return state.merge(fromJS({
        hasError: false,
        isLoading: true,
      }))

    case FETCH_COMMENT_SUCCESS:
      return state.merge(fromJS({
        comments: action.payload.meta,
        hasError: false,
        isLoading: false,
      }))

    case POST_COMMENT_SUCCESS:
      return processPostComment(state, action)

    case POST_COMMENT_ERROR:
    case FETCH_COMMENT_ERROR:
      return state.merge(fromJS({
        hasError: true,
        isLoading: false,
      }))
    default:
      return state
  }
}

export default commentReducer


function processPostComment(state, action) {
  const comment = action.payload.meta as ICommentServerResponse

  const oldTable = state.get('comments') as Map<string, List<any>>

  let newTable
  if (oldTable.get(comment.postId)) {
    newTable = oldTable.set(
      comment.postId,
      oldTable.get(comment.postId).push(comment)).toJS()
  } else {
    newTable = oldTable.set(comment.postId, List([comment]))
  }

  return state.merge(fromJS({
    comments: newTable,
    hasError: false,
    isLoading: false,
  }))
}
