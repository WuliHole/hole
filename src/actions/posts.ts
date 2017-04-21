import {
  GET_USER_POSTS_PENDING,
  GET_USER_POSTS_SUCCESS,
  GET_USER_POSTS_ERROR
} from '../constants/posts.action.types';
import { getPosts } from '../api/user'


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
