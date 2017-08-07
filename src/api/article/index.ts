import { post, get, put } from '../server/';
import { RawDraftContentState } from 'draft-js'
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

export function getPostById(postId: string | number) {
  return new Promise((resolve, reject) => {
    return get(`/post/${postId}`)
      .then((json: any) => resolve(json))
      .then(null, (err) => reject(new Error(err.message)));
  })
}

export function updatePost(postId: string | number, content: RawDraftContentState) {
  return new Promise((resolve, reject) => {
    return put(`/post/${postId}`, { content })
      .then((json: any) => resolve(json))
      .then(null, (err) => reject(new Error(err.message)));
  })
}
