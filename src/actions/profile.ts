import * as ActionTypes from '../constants/profile'
import { getProfile as reqGetProfile } from '../api/user'

export function getProfile(userId: string | number) {
  if (!userId) {
    return
  }
  return (dispatch, getState) => {
    return dispatch({
      types: [
        ActionTypes.GET_PROFILE_PENDING,
        ActionTypes.GET_PROFILE_SUCCESS,
        ActionTypes.GET_PROFILE_ERROR
      ],
      payload: {
        promise: reqGetProfile(userId)
          .then((res) => {
            return res;
          }),
      },
    })
  }
}
