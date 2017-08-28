import { } from './../constants/posts.action.types';
import {
  GET_PUBLISHED_POST_FOR_USER_PENDING,
  GET_PUBLISHED_POST_FOR_USER_SUCCESS,
  GET_PUBLISHED_POST_FOR_USER_ERROR,

  PUBLISH_POST_PENDING,
  PUBLISH_POST_SUCCESS,
  PUBLISH_POST_ERROR,

  GET_DRAFT_FOR_USER_PENDING,
  GET_DRAFT_FOR_USER_SUCCESS,
  GET_DRAFT_FOR_USER_ERROR,

  GET_POST_BY_ID_ERROR,
  GET_POST_BY_ID_PENDING,
  GET_POST_BY_ID_SUCCESS,

  UPDATE_POST_ERROR,
  UPDATE_POST_PENDING,
  UPDATE_POST_SUCCESS,

  CREATE_POST_PENDING,
  CREATE_POST_ERROR,
  CREATE_POST_SUCCESS,
  EDIT_POST
} from '../constants/posts.action.types';
import { getPublishedPostsForUser, getDraftForUser } from '../api/user'
import { getPostById, updatePost, createNew, publishPost } from '../api/article'
import { EditorState, ContentState } from 'draft-js'
import { Serlizer } from '../components/editor/utils/serializer'

type POST_ID = string | number
export function getPublished(uid: string | number) {
  if (!uid) {
    return
  }
  return (dispatch, getState) => {
    return dispatch({
      types: [
        GET_PUBLISHED_POST_FOR_USER_PENDING,
        GET_PUBLISHED_POST_FOR_USER_SUCCESS,
        GET_PUBLISHED_POST_FOR_USER_ERROR
      ],
      payload: {
        promise: getPublishedPostsForUser(uid)
          .then((res) => {
            return res;
          }),
      },
    })
  }
}

export function getDraft(uid: string | number) {
  if (!uid) {
    return
  }
  return (dispatch, getState) => {
    return dispatch({
      types: [
        GET_DRAFT_FOR_USER_PENDING,
        GET_DRAFT_FOR_USER_SUCCESS,
        GET_DRAFT_FOR_USER_ERROR
      ],
      payload: {
        promise: getDraftForUser(uid)
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


export function update(postId: POST_ID, content: ContentState) {
  return dispatch => dispatch(({
    types: [
      UPDATE_POST_PENDING,
      UPDATE_POST_SUCCESS,
      UPDATE_POST_ERROR
    ],
    payload: {
      promise: updatePost(postId, Serlizer.serialize(content)).then(res => res)
    }
  }))
}

export function publish(postId: POST_ID) {
  return dispatch => dispatch(({
    types: [
      PUBLISH_POST_PENDING,
      PUBLISH_POST_SUCCESS,
      PUBLISH_POST_ERROR
    ],
    payload: {
      promise: publishPost(postId),
    }
  }))
}

export function edit(postId: POST_ID) {
  return {
    type: EDIT_POST,
    payload: { id: postId }
  }
}
