import { createSelector } from 'reselect'
import { List, Map } from 'immutable'
import { RawDraftContentState } from 'draft-js'
import { getIdFromRouter } from './router'
type CommentMap = Map<string, IComment[]>

const commentSelector = state =>
  state
    .comment
    .get('comments') as CommentMap

export const getCommentByPostId = createSelector(
  [commentSelector, getIdFromRouter],
  (comments: CommentMap, postId: number) => {
    return comments.find((comment, key) => parseInt(key, 10) === postId)
  }
)




