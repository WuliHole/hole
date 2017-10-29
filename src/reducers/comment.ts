import { debug } from '../utils/debug'
import {
  GET_COMMENT_LIST_ERROR,
  GET_COMMENT_LIST_PENDING,
  GET_COMMENT_LIST_SUCCESS,

  POST_COMMENT_ERROR,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_PENDING,

} from '../constants/comment.action.types'

import { fromJS, List, Map } from 'immutable'

const INITIAL_STATE = fromJS({
  // key value pair  { postId : comment[] }
  comments: {},
  hasError: false,
  isLoading: false,
  lastActionType: ''
})

function commentReducer(state = INITIAL_STATE,
  action = { type: '', payload: null }) {
  switch (action.type) {

    case GET_COMMENT_LIST_PENDING:
    case POST_COMMENT_PENDING:
      return state.merge(fromJS({
        hasError: false,
        isLoading: true,
      }))

    // @FIX: implement fetch process after next verion
    case GET_COMMENT_LIST_SUCCESS:
      return processGetCommetList(state, action)

    case POST_COMMENT_SUCCESS:
      return processPostComment(state, action)

    case POST_COMMENT_ERROR:
    case GET_COMMENT_LIST_ERROR:
      return state.merge(fromJS({
        hasError: true,
        isLoading: false,
      }))
    default:
      return state
  }
}

export default commentReducer

function processGetCommetList(state, action) {
  const comments = action.payload as CommentPayload[]
  if (comments.length === 0) {
    return state
  }


  const postId = comments[0].postId.toString()
  const oldComments: List<CommentPayload>
    = state.getIn(['comments', postId.toString()])

  const newComments = oldComments
    ? oldComments.concat(comments)
    : List(comments) as any

  const oldTable = state.get('comments') as Map<string, List<any>>
  const newTable = oldTable.merge({
    [postId]: newComments
  })
  return state.merge({
    comments: newTable,
    hasError: false,
    isLoading: false,
  })
}

function processPostComment(state, action) {
  const comment = action.payload as CommentPayload
  const oldTable = state.get('comments') as Map<string, List<any>>

  const oldComments = state
    .get('comments')
    .get(comment.postId.toString())

  const newComments = oldComments
    ? oldComments.push(comment)
    : List().push(comment)
  const newTable = oldTable.merge({
    [comment.postId]: newComments
  })
  return state.merge(fromJS({
    comments: newTable,
    hasError: false,
    isLoading: false,
  }))
}
