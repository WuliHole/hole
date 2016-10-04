import { post } from '../server/';

const ARTICLE_LIST_ERR_MSG = `
  ARTICLE_LIST_ERR_MSG.
`;

export function fetchArticleList() {
  return new Promise((resolve, reject) => {
    return post('/article/list', {})
    .then(json => resolve(json.meta))
    .then(null, (err) => reject(new Error(ARTICLE_LIST_ERR_MSG)));
  });
}


