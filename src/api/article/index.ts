import { post } from '../server/';

const ARTICLE_LIST_ERR_MSG = `
  ARTICLE_LIST_ERR_MSG.
`;

export function fetchArticleList() {
  return post('/article/list', {})
}

export function createNew({ title = 'New post', content = {} }) {
  return new Promise((resolve, reject) => {
    return post('/post', { title, content })
      .then((json: any) => resolve(json))
      .then(null, (err) => reject(new Error(err.message)));
  });
}

