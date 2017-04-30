import {
  POST_COMMENT_PENDING,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_ERROR,

  GET_COMMENT_LIST_ERROR,
  GET_COMMENT_LIST_PENDING,
  GET_COMMENT_LIST_SUCCESS,
} from '../constants/comment.action.types'

import {
  CommentQueryOptions,
  CreateCommentParams,
  getCommetList,
  create
} from '../api/comment'

export type IGetComment = (
  postId: number,
  options?: CommentQueryOptions
) => Promise<any>

export function getComments(postId: number, options?: CommentQueryOptions) {
  return (dispatch, getState) => {
    return dispatch({
      types: [
        GET_COMMENT_LIST_PENDING,
        GET_COMMENT_LIST_SUCCESS,
        GET_COMMENT_LIST_ERROR,
      ],
      payload: {
        promise: getCommetList(postId, options)
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


