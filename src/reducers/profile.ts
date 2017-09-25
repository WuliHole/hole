import {
  GET_PROFILE_PENDING,
  GET_PROFILE_ERROR,
  GET_PROFILE_SUCCESS,

  FOLLOW_USER_ERROR,
  FOLLOW_USER_PENDING,
  FOLLOW_USER_SUCCESS,

  UNFOLLOW_USER_ERROR,
  UNFOLLOW_USER_PENDING,
  UNFOLLOW_USER_SUCCESS
} from '../constants/profile';

import { fromJS, Map } from 'immutable';



const INITIAL_STATE = fromJS({
  // key value pair
  // ex: {201:profileOf201]}
  meta: {},
  isLoading: false,
  hasError: false,
  errMsg: null
});

function profileReducer(state = INITIAL_STATE,
  action = { type: '', payload: null }) {
  let meta = (state.get('meta') as Map<any, any>)
  switch (action.type) {

    case FOLLOW_USER_PENDING:
    case UNFOLLOW_USER_PENDING:
    case GET_PROFILE_PENDING:
      return state.merge(fromJS({
        hasError: false,
        isLoading: true,
      }));

    case GET_PROFILE_SUCCESS:
      let data = action.payload
      let oldData = meta.get(`${data.id}`)
      return state.merge(fromJS({
        meta: meta.merge({
          [action.payload.id]: oldData ? oldData.merge(data) : data
        }),
        hasError: false,
        isLoading: false,
      }))

    case GET_PROFILE_ERROR:
      return state.merge(fromJS({
        errMsg: action.payload.message,
        hasError: true,
        isLoading: false,
      }))

    case FOLLOW_USER_SUCCESS:
      return state.merge(fromJS({
        meta: meta.setIn([`${action.payload.id}`, 'followedUser'], true),
        hasError: false,
        isLoading: false,
      }))

    case UNFOLLOW_USER_SUCCESS:
      return state.merge(fromJS({
        meta: meta.setIn([`${action.payload.id}`, 'followedUser'], false),
        hasError: false,
        isLoading: false,
      }))

    default:
      return state;
  }
}

export default profileReducer;
