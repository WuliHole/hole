import { fetchArticleList, createNew } from '../api/article/';
import {
  FETCH_ARTICLE_LIST_PENDING,
  FETCH_ARTICLE_LIST_SUCCESS,
  FETCH_ARTICLE_LIST_ERROR,

  CREATE_POST_PENDING,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
} from '../constants/article.action.types';

export function updateArticleList() {
  return (dispatch, getState) => {
    return dispatch({
      types: [
        FETCH_ARTICLE_LIST_PENDING,
        FETCH_ARTICLE_LIST_SUCCESS,
        FETCH_ARTICLE_LIST_ERROR
      ],
      payload: {
        promise: fetchArticleList()
          .then((res) => {
            return res;
          }),
      },
    });
  };
}

export function create() {
  return (dispatch, getState) => {
    return dispatch({
      types: [
        CREATE_POST_PENDING,
        CREATE_POST_SUCCESS,
        CREATE_POST_ERROR
      ],
      payload: {
        promise: createNew({})
          .then((res) => {
            return res;
          }),
      },
    });
  };
}

