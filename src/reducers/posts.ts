import {
  GET_USER_POSTS_ERROR,
  GET_USER_POSTS_PENDING,
  GET_USER_POSTS_SUCCESS,

  GET_POST_BY_ID_ERROR,
  GET_POST_BY_ID_PENDING,
  GET_POST_BY_ID_SUCCESS,

  CREATE_POST_ERROR,
  CREATE_POST_PENDING,
  CREATE_POST_SUCCESS,

  UPDATE_POST_ERROR,
  UPDATE_POST_PENDING,
  UPDATE_POST_SUCCESS
} from '../constants/posts.action.types';

import { fromJS, List, Map } from 'immutable';

type POST = Map<keyof Post<any>, any>
const INITIAL_STATE = fromJS({
  /**
   * post[]
   */
  meta: {},
  total: 0,
  hasError: false,
  isLoading: false,
  editing: null,
});

function postsReducer(state = INITIAL_STATE,
  action = { type: '', payload: null }) {
  const meta = state.get('meta') as Map<string, POST>

  switch (action.type) {

    case GET_POST_BY_ID_PENDING:
    case GET_USER_POSTS_PENDING:
    case UPDATE_POST_PENDING:
    case CREATE_POST_PENDING:
      return state.merge(fromJS({
        hasError: false,
        isLoading: true,
      }));

    case GET_USER_POSTS_SUCCESS:
      return state.merge(fromJS({
        meta: meta.merge(mapPosts(action.payload.meta) as POST),
        hasError: false,
        isLoading: false,
        total: state.get('total') + action.payload.meta.length
      }))

    case GET_POST_BY_ID_SUCCESS:
      return state.merge(fromJS({
        meta: meta.set(action.payload.id, Map(action.payload) as POST),
        hasError: false,
        isLoading: false,
        total: state.get('total') + 1
      }))

    case CREATE_POST_SUCCESS:
      return state.merge(fromJS({
        meta: meta.set(action.payload.id, Map(action.payload) as POST),
        hasError: false,
        isLoading: false,
        editing: action.payload.id,
        total: state.get('total') + 1
      }))

    case UPDATE_POST_SUCCESS:
      return state.merge(fromJS({
        meta: meta.set(action.payload.id, Map(action.payload) as POST),
        isLoading: false,
        hasError: false
      }))

    case GET_POST_BY_ID_ERROR:
    case GET_USER_POSTS_ERROR:
    case CREATE_POST_ERROR:
    case UPDATE_POST_ERROR:
      return state.merge(fromJS({
        errMsg: action.payload.message,
        hasError: true,
        isLoading: false,
      }));
    default:
      return state;
  }
}

function mapPosts(posts: Post<any>[]) {
  let map = {}
  posts.forEach(p => map[p.id] = p)
  return map
}

export default postsReducer;
