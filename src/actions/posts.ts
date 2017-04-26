import {
  GET_USER_POSTS_PENDING,
  GET_USER_POSTS_SUCCESS,
  GET_USER_POSTS_ERROR,

  GET_POST_BY_ID_ERROR,
  GET_POST_BY_ID_PENDING,
  GET_POST_BY_ID_SUCCESS
} from '../constants/posts.action.types';
import { getPosts } from '../api/user'
import { getPostById } from '../api/article'

export function getUserPosts(uid: string | number) {
  return (dispatch, getState) => {
    return dispatch({
      types: [
        GET_USER_POSTS_PENDING,
        GET_USER_POSTS_SUCCESS,
        GET_USER_POSTS_ERROR
      ],
      payload: {
        promise: getPosts(uid)
          .then((res) => {
            return res;
          }),
      },
    })
  }
}


export function getById(postId: string | number) {
  return (dispatch, getState) => {
    return dispatch({
      types: [
        GET_POST_BY_ID_PENDING,
        GET_POST_BY_ID_SUCCESS,
        GET_POST_BY_ID_ERROR
      ],
      payload: {
        promise: getPostById(postId)
          .then((res) => {
            return res;
          }),
      },
    })
  }
}
