import {
  GET_PUBLISHED_POST_FOR_USER_ERROR,
  GET_PUBLISHED_POST_FOR_USER_PENDING,
  GET_PUBLISHED_POST_FOR_USER_SUCCESS,

  GET_DRAFT_FOR_USER_ERROR,
  GET_DRAFT_FOR_USER_PENDING,
  GET_DRAFT_FOR_USER_SUCCESS,

  GET_POST_BY_ID_ERROR,
  GET_POST_BY_ID_PENDING,
  GET_POST_BY_ID_SUCCESS,

  CREATE_POST_ERROR,
  CREATE_POST_PENDING,
  CREATE_POST_SUCCESS,

  UPDATE_POST_ERROR,
  UPDATE_POST_PENDING,
  UPDATE_POST_SUCCESS,
  EDIT_POST
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
    case GET_PUBLISHED_POST_FOR_USER_PENDING:
    case GET_DRAFT_FOR_USER_PENDING:
    case UPDATE_POST_PENDING:
    case CREATE_POST_PENDING:
      return state.merge(fromJS({
        hasError: false,
        isLoading: true,
      }));

    case GET_DRAFT_FOR_USER_SUCCESS:
    case GET_PUBLISHED_POST_FOR_USER_SUCCESS:
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

    case EDIT_POST:
      return state.merge(fromJS({
        editing: action.payload.id
      }))

    case UPDATE_POST_SUCCESS:
      return state.merge(fromJS({
        meta: meta.set(action.payload.id, Map(action.payload) as POST),
        isLoading: false,
        hasError: false
      }))

    case GET_POST_BY_ID_ERROR:
    case GET_PUBLISHED_POST_FOR_USER_ERROR:
    case GET_DRAFT_FOR_USER_ERROR:
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
