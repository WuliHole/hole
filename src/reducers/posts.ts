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


  PUBLISH_POST_ERROR,
  PUBLISH_POST_PENDING,
  PUBLISH_POST_SUCCESS,

  UPVOTE_POST_SUCCESS,
  REMOVE_UPVOTE_RECORD_SUCCESS,
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
  const uid = action.payload && action.payload.id
  switch (action.type) {

    case GET_POST_BY_ID_PENDING:
    case GET_PUBLISHED_POST_FOR_USER_PENDING:
    case GET_DRAFT_FOR_USER_PENDING:
    case UPDATE_POST_PENDING:
    case CREATE_POST_PENDING:
    case PUBLISH_POST_PENDING:
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
        meta: meta.merge({ [uid]: action.payload as POST }),
        hasError: false,
        isLoading: false,
        total: state.get('total') + 1
      }))

    case CREATE_POST_SUCCESS:
      return state.merge(fromJS({
        meta: meta.merge({ [uid]: action.payload as POST }),
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
        meta: meta.merge({ [uid]: action.payload as POST }),
        isLoading: false,
        hasError: false
      }))

    case UPVOTE_POST_SUCCESS:
      return state.merge(fromJS({
        meta: meta
          .setIn([uid.toString(), 'upvoteCount'], meta.getIn([uid.toString(), 'upvoteCount'], 0) + 1)
          .setIn([uid.toString(), 'upvoted'], true),
        isLoading: false,
        hasError: false
      }))

    case REMOVE_UPVOTE_RECORD_SUCCESS:
      const count = meta.getIn([uid.toString(), 'upvoteCount'], 0)
      return state.merge(fromJS({
        meta: meta
          .setIn([uid.toString(), 'upvoteCount'], count > 0 ? count - 1 : 0)
          .setIn([uid.toString(), 'upvoted'], false),
        isLoading: false,
        hasError: false
      }))


    case PUBLISH_POST_SUCCESS:
      const id: number = action.payload.id
      const published = action.payload.published
      const post = meta.find(p => p.get('id') === id)
      const newPost = post.merge(Map({ id, published }))
      return state.merge(fromJS({
        meta: meta.set(id.toString(), newPost as any),
        isLoading: false,
        hasError: false
      }))

    case GET_POST_BY_ID_ERROR:
    case GET_PUBLISHED_POST_FOR_USER_ERROR:
    case GET_DRAFT_FOR_USER_ERROR:
    case CREATE_POST_ERROR:
    case UPDATE_POST_ERROR:
    case PUBLISH_POST_PENDING:
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
