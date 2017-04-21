import {
  FETCH_ARTICLE_LIST_ERROR,
  FETCH_ARTICLE_LIST_PENDING,
  FETCH_ARTICLE_LIST_SUCCESS,

  CREATE_POST_ERROR,
  CREATE_POST_PENDING,
  CREATE_POST_SUCCESS,


} from '../constants/article.action.types';

import { fromJS, List } from 'immutable';

const INITIAL_STATE = fromJS({
  articleList: [],
  hasError: false,
  isLoading: false,
  editing: null,
});

function articleReducer(state = INITIAL_STATE,
  action = { type: '', payload: null }) {
  switch (action.type) {

    case FETCH_ARTICLE_LIST_PENDING:
    case CREATE_POST_PENDING:
      return state.merge(fromJS({
        hasError: false,
        isLoading: true,
      }));

    case CREATE_POST_SUCCESS:
      return state.merge(fromJS({
        articleList: state.get('articleList').push(action.payload),
        hasError: false,
        isLoading: false,
        editing: action.payload.id
      }))

    case FETCH_ARTICLE_LIST_SUCCESS:
      return state.merge(fromJS({
        articleList: action.payload.meta,
        hasError: false,
        isLoading: false,
      }));


    case CREATE_POST_ERROR:
    case FETCH_ARTICLE_LIST_ERROR:
      return state.merge(fromJS({
        errMsg: action.payload.message,
        hasError: true,
        isLoading: false,
      }));
    default:
      return state;
  }
}

export default articleReducer;
