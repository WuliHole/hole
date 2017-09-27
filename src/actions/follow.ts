import * as Types from 'app/constants/follow.action.types'
import { CREATE_USER_INFO } from 'app/constants/profile'
import { get } from 'app/api/server'

export interface FollowActionParams {
  url?: string
  offset?: number
  uid: Uid
}

function keys(res) {
  const keys = []
  for (let key in res) {
    if (key) {
      keys.push(key)
    }
  }
  return keys
}

function recordUser(dispatch, users = {}) {
  dispatch({
    type: CREATE_USER_INFO,
    payload: { users }
  })
}


export function addFollowerForUser(id: Uid, followerId: Uid) {
  return {
    type: Types.ADD_FOLLOWER_FOR_USER,
    payload: { id, followerId }
  }
}

export function removeFollowerForUser(id: Uid, followerId: Uid) {
  return {
    type: Types.REMOVE_FOLLOWER_FOR_USER,
    payload: { id, followerId }
  }
}

export function addFollowingForUser(id: Uid, followingId: Uid) {
  return {
    type: Types.ADD_FOLLOWING_FOR_USER,
    payload: { id, followingId }
  }
}

export function removeFollowingForUser(id: Uid, followingId: Uid) {
  return {
    type: Types.REMOVE_FOLLOWING_FOR_USER,
    payload: { id, followingId }
  }
}


export function getFollowers(opts: FollowActionParams) {
  return (dispatch, getState) => {
    return dispatch({
      types: [
        Types.GET_USER_FOLLOWERS_PENDING,
        Types.GET_USER_FOLLOWERS_SUCCESS,
        Types.GET_USER_FOLLOWERS_ERROR
      ],
      payload: {
        promise: get(`/user/${opts.uid}/followers`)
          .then((res) => {
            const followers = keys(res.followers)
            recordUser(dispatch, res.followers)
            return { ...res, followers, id: opts.uid, }
          }),
      },
    })
  }
}

export function getNextFollowers(opts: FollowActionParams) {
  return (dispatch, getState) => {
    return dispatch({
      types: [
        Types.GET_NEXT_USER_FOLLOWERS_PENDING,
        Types.GET_NEXT_USER_FOLLOWERS_SUCCESS,
        Types.GET_NEXT_USER_FOLLOWERS_ERROR
      ],
      payload: {
        promise: get(opts.url)
          .then((res) => {
            const followers = keys(res.followers)
            recordUser(dispatch, res.followers)
            return { ...res, followers, id: opts.uid, }
          }),
      },
    })
  }
}

export function getFollowings(opts: FollowActionParams) {
  return (dispatch, getState) => {
    return dispatch({
      types: [
        Types.GET_USER_FOLLOWINGS_PENDING,
        Types.GET_USER_FOLLOWINGS_SUCCESS,
        Types.GET_USER_FOLLOWINGS_ERROR
      ],
      payload: {
        promise: get(opts.url || `/user/${opts.uid}/followings`)
          .then((res) => {
            const followings = keys(res.followings)
            recordUser(dispatch, res.followings)
            return { ...res, followings, id: opts.uid, }
          }),
      },
    })
  }
}

export function getNextFollowings(opts: FollowActionParams) {
  return (dispatch, getState) => {
    return dispatch({
      types: [
        Types.GET_NEXT_USER_FOLLOWINGS_PENDING,
        Types.GET_NEXT_USER_FOLLOWINGS_SUCCESS,
        Types.GET_NEXT_USER_FOLLOWINGS_ERROR
      ],
      payload: {
        promise: get(opts.url)
          .then((res) => {
            const followings = keys(res.followings)
            recordUser(dispatch, res.followings)
            return { ...res, followings, id: opts.uid, }
          }),
      },
    })
  }
}



