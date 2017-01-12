import {
  POST_COMMENT_PENDING,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_ERROR,

  FETCH_COMMENT_ERROR,
  FETCH_COMMENT_PENDING,
  FETCH_COMMENT_SUCCESS,
} from '../constants/comment.action.types'

import {
  CommentQueryOptions,
  CreateCommentParams,
  fetch,
  create
} from '../api/comment'

export type IGetComment = (options: CommentQueryOptions) => Promise<any>
export function getComment(options: CommentQueryOptions) {
  return (dispatch, getState) => {
    return dispatch({
      types: [
        FETCH_COMMENT_PENDING,
        FETCH_COMMENT_SUCCESS,
        FETCH_COMMENT_ERROR,
      ],
      payload: {
        promise: fetch(options)
          .then((res) => {
            return res;
          }),
      },
    })
  }
}

export type IPostComment = (params: CreateCommentParams) => Promise<any>
export function postComment(params: CreateCommentParams) {
  return (dispatch, getState) => {
    return dispatch({
      types: [
        POST_COMMENT_PENDING,
        POST_COMMENT_SUCCESS,
        POST_COMMENT_ERROR,
      ],
      payload: {
        promise: create(params)
          .then((res) => {
            return res;
          }),
      },
    })
  }
}


