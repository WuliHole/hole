import {
  GET_USER_POSTS_PENDING,
  GET_USER_POSTS_SUCCESS,
  GET_USER_POSTS_ERROR,

  GET_POST_BY_ID_ERROR,
  GET_POST_BY_ID_PENDING,
  GET_POST_BY_ID_SUCCESS,

  UPDATE_POST_ERROR,
  UPDATE_POST_PENDING,
  UPDATE_POST_SUCCESS,

  CREATE_POST_PENDING,
  CREATE_POST_ERROR,
  CREATE_POST_SUCCESS
} from '../constants/posts.action.types';
import { getPosts } from '../api/user'
import { getPostById, updatePost, createNew } from '../api/article'
import { EditorState } from 'draft-js'
import { Serlizer } from '../components/editor/utils/serializer'

type POST_ID = string | number
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


export function getById(postId: POST_ID) {
  return (dispatch, getState) => {
    return dispatch({
      types: [
        GET_POST_BY_ID_PENDING,
        GET_POST_BY_ID_SUCCESS,
        GET_POST_BY_ID_ERROR
      ],
      payload: {
        promise: getPostById(postId).then(res => res),
      },
    })
  }
}



export function create() {
  return (dispatch, getState) => {
    return dispatch({
      types: [
        CREATE_POST_PENDING,
        CREATE_POST_SUCCESS,
        CREATE_POST_ERROR
      ],
      payload: {
        promise: createNew({
          content: Serlizer.serialize(
            EditorState.createEmpty().getCurrentContent()
          )
        })
          .then((res) => {
            return res;
          }),
      },
    });
  };
}


export function update(postId: POST_ID) {
  return dispatch => dispatch(({
    types: [
      UPDATE_POST_PENDING,
      UPDATE_POST_SUCCESS,
      UPDATE_POST_ERROR
    ],
    payload: {
      promise: updatePost(postId).then(res => res)
    }
  }))
}
