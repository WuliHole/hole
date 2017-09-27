import * as ActionTypes from '../constants/profile'
import { addFollowerForUser, addFollowingForUser, removeFollowerForUser, removeFollowingForUser } from './follow'
import * as req from '../api/user'

export function getProfile(userId: Uid) {
  return (dispatch, getState) => {
    return dispatch({
      types: [
        ActionTypes.GET_PROFILE_PENDING,
        ActionTypes.GET_PROFILE_SUCCESS,
        ActionTypes.GET_PROFILE_ERROR
      ],
      payload: {
        promise: req.getProfile(userId)
          .then((res) => {
            return res;
          }),
      },
    })
  }
}

export function follow(userId: Uid) {
  return (dispatch, getState) => {
    const currentUid = getState().session.getIn(['user', 'id'])
    dispatch(addFollowingForUser(currentUid, userId))
    dispatch(addFollowerForUser(userId, currentUid))

    return dispatch({
      types: [
        ActionTypes.FOLLOW_USER_PENDING,
        ActionTypes.FOLLOW_USER_SUCCESS,
        ActionTypes.FOLLOW_USER_ERROR
      ],
      payload: {
        promise: req.follow(userId)
          .then((res) => {
            return { id: userId, currentUid };
          }),
      },
    })
  }
}

export function unfollow(userId: Uid) {
  return (dispatch, getState) => {
    const currentUid = getState().session.getIn(['user', 'id'])
    dispatch(removeFollowingForUser(currentUid, userId))
    dispatch(removeFollowerForUser(userId, currentUid))
    return dispatch({
      types: [
        ActionTypes.UNFOLLOW_USER_PENDING,
        ActionTypes.UNFOLLOW_USER_SUCCESS,
        ActionTypes.UNFOLLOW_USER_ERROR
      ],
      payload: {
        promise: req.unfollow(userId)
          .then((res) => {
            return { id: userId, currentUid }
          }),
      },
    })
  }
}
