import * as Types from '../constants/posts.action.types';
import { getPublishedPostsForUser, getDraftForUser } from '../api/user'
import { getPostById, updatePost, createNew, publishPost, upvote, removeUpvote } from '../api/article'
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
        Types.GET_PUBLISHED_POST_FOR_USER_PENDING,
        Types.GET_PUBLISHED_POST_FOR_USER_SUCCESS,
        Types.GET_PUBLISHED_POST_FOR_USER_ERROR
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
        Types.GET_DRAFT_FOR_USER_PENDING,
        Types.GET_DRAFT_FOR_USER_SUCCESS,
        Types.GET_DRAFT_FOR_USER_ERROR
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
        Types.GET_POST_BY_ID_PENDING,
        Types.GET_POST_BY_ID_SUCCESS,
        Types.GET_POST_BY_ID_ERROR
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
        Types.CREATE_POST_PENDING,
        Types.CREATE_POST_SUCCESS,
        Types.CREATE_POST_ERROR
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
      Types.UPDATE_POST_PENDING,
      Types.UPDATE_POST_SUCCESS,
      Types.UPDATE_POST_ERROR
    ],
    payload: {
      promise: updatePost(postId, Serlizer.serialize(content)).then(res => res)
    }
  }))
}

export function publish(postId: POST_ID, tags?: string) {
  return dispatch => dispatch(({
    types: [
      Types.PUBLISH_POST_PENDING,
      Types.PUBLISH_POST_SUCCESS,
      Types.PUBLISH_POST_ERROR
    ],
    payload: {
      promise: publishPost(postId, tags),
    }
  }))
}

export function edit(postId: POST_ID) {
  return {
    type: Types.EDIT_POST,
    payload: { id: postId }
  }
}

export function upvotePost(postId: POST_ID) {
  return dispatch => dispatch(({
    types: [
      Types.UPVOTE_POST_PENDING,
      Types.UPVOTE_POST_SUCCESS,
      Types.UPVOTE_POST_ERROR
    ],
    payload: {
      promise: upvote(postId).then(res => {
        return {
          id: postId
        }
      })
    }
  }))
}

export function removeUpvoteRecord(postId: POST_ID) {
  return dispatch => dispatch(({
    types: [
      Types.REMOVE_UPVOTE_RECORD_PENDING,
      Types.REMOVE_UPVOTE_RECORD_SUCCESS,
      Types.REMOVE_UPVOTE_RECORD_ERROR
    ],
    payload: {
      promise: removeUpvote(postId).then(res => {
        return {
          id: postId
        }
      })
    }
  }))
}
