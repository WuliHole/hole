import {
  GET_USER_POSTS_ERROR,
  GET_USER_POSTS_PENDING,
  GET_USER_POSTS_SUCCESS,

  GET_POST_BY_ID_ERROR,
  GET_POST_BY_ID_PENDING,
  GET_POST_BY_ID_SUCCESS
} from '../constants/posts.action.types';

import { fromJS, List, Map } from 'immutable';

const INITIAL_STATE = fromJS({
  /**
   * post[]
   */
  meta: [],
  total: 0,
  hasError: false,
  isLoading: false,
  editing: null,
});

function postsReducer(state = INITIAL_STATE,
  action = { type: '', payload: null }) {
  const meta = state.get('meta') as List<any>
  switch (action.type) {

    case GET_POST_BY_ID_PENDING:
    case GET_USER_POSTS_PENDING:
      return state.merge(fromJS({
        hasError: false,
        isLoading: true,
      }));

    case GET_USER_POSTS_SUCCESS:
      return state.merge(fromJS({
        meta: meta.toJS().concat(action.payload.meta),
        hasError: false,
        isLoading: false,
        total: state.get('total') + (action.payload.count || 0)
      }))

    case GET_POST_BY_ID_SUCCESS:

      return state.merge(fromJS({
        meta: meta.push(Map(action.payload)),
        hasError: false,
        isLoading: false,
        total: state.get('total') + 1
      }))

    case GET_POST_BY_ID_ERROR:
    case GET_USER_POSTS_ERROR:
      return state.merge(fromJS({
        errMsg: action.payload.message,
        hasError: true,
        isLoading: false,
      }));
    default:
      return state;
  }
}

export default postsReducer;
