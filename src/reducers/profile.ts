import {
  GET_PROFILE_PENDING,
  GET_PROFILE_ERROR,
  GET_PROFILE_SUCCESS
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
  switch (action.type) {

    case GET_PROFILE_PENDING:
      return state.merge(fromJS({
        hasError: false,
        isLoading: true,
      }));

    case GET_PROFILE_SUCCESS:
      return state.merge(fromJS({
        meta: (state.get('meta') as Map<any, any>).merge({
          [action.payload.id]: action.payload
        }),
        hasError: false,
        isLoading: false,
      }))

    case GET_PROFILE_ERROR:
      return state.merge(fromJS({
        errMsg: action.payload.message,
        hasError: true,
        isLoading: false,
      }));
    default:
      return state;
  }
}

export default profileReducer;
