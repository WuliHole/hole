import { fetchArticleList } from '../api/article/';
import {
    FETCH_ARTICLE_LIST_PENDING,
    FETCH_ARTICLE_LIST_SUCCESS,
    FETCH_ARTICLE_LIST_ERROR
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

