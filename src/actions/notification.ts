import * as Types from '../constants/feed.action.types'
import { get } from 'app/api/server'

function _resolvePayload(res: StreamIoPyload) {
  return {
    data: res.results,
    next: res.next,
    unread: res.unread
  }
}

export const clearnUnreadNotification = () => {
  return {
    type: Types.CLEAR_UNREAD_NOTIFICATION
  }
}

export function initialLoadNotifications(userId, feedToken: string) {
  return (dispatch, getState) => {
    return dispatch({
      types: [
        Types.INITIAL_LOAD_NOTIFICATIONS_PENDING,
        Types.INITIAL_LOAD_NOTIFICATIONS_SUCCESS,
        Types.INITIAL_LOAD_NOTIFICATIONS_ERROR
      ],
      payload: {
        promise: get(`/user/${userId}/notifications`)
          .then((res) => {
            return _resolvePayload(res)
          })
      },
    })
  }
}

export function loadNextNotifications(nextUrl, feedToken: string) {
  return (dispatch, getState) => {
    return dispatch({
      types: [
        Types.INITIAL_LOAD_NOTIFICATIONS_PENDING,
        Types.INITIAL_LOAD_NOTIFICATIONS_SUCCESS,
        Types.INITIAL_LOAD_NOTIFICATIONS_ERROR
      ],
      payload: {
        promise: get(nextUrl, null, _AuthHeader(feedToken))
          .then((res) => {
            return _resolvePayload(res)
          })
      },
    })
  }
}

const _AuthHeader = (token: string) => ({ 'Stream-Auth-Type': 'jwt', 'Authorization': token })