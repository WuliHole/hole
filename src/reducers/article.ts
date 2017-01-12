import {
  FETCH_ARTICLE_LIST_ERROR,
  FETCH_ARTICLE_LIST_PENDING,
  FETCH_ARTICLE_LIST_SUCCESS
} from '../constants/article.action.types';

import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  articleList: [],
  hasError: false,
  isLoading: false,
});

function articleReducer(state = INITIAL_STATE,
  action = { type: '', payload: null }) {
  switch (action.type) {
    case FETCH_ARTICLE_LIST_PENDING:
      return state.merge(fromJS({
        hasError: false,
        isLoading: true,
      }));

    case FETCH_ARTICLE_LIST_SUCCESS:
      return state.merge(fromJS({
        articleList: action.payload.meta,
        hasError: false,
        isLoading: false,
      }));

    case FETCH_ARTICLE_LIST_ERROR:
      return state.merge(fromJS({
        hasError: true,
        isLoading: false,
      }));
    default:
      return state;
  }
}

export default articleReducer;
