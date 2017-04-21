import {
  GET_USER_POSTS_ERROR,
  GET_USER_POSTS_PENDING,
  GET_USER_POSTS_SUCCESS
} from '../constants/posts.action.types';

import { fromJS, List } from 'immutable';

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
  switch (action.type) {

    case GET_USER_POSTS_PENDING:
      return state.merge(fromJS({
        hasError: false,
        isLoading: true,
      }));

    case GET_USER_POSTS_SUCCESS:
      const meta = state.get('meta') as List<any>
      return state.merge(fromJS({
        meta: meta.merge(action.payload.meta),
        hasError: false,
        isLoading: false,
        total: state.get('total') + (action.payload.count || 0)
      }))

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
