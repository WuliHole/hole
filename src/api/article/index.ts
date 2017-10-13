import { post, get, put, deleete } from '../server/';
import { RawDraftContentState } from 'draft-js'
type PostId = string | number

export function fetchArticleList() {
  return post('/article/list', {})
}

export function createNew({ title = '', content = {} }) {
  return post('/post', { title, content })
}

export function getPostById(postId: PostId) {
  return get(`/post/${postId}`)
}

export function updatePost(postId: PostId, content: RawDraftContentState) {
  return put(`/post/${postId}`, { content })
}

export function publishPost(postId: PostId, tags = '') {
  return post(`/post/${postId}/publish`, { tags })
}

export function upvote(postId: PostId) {
  return get(`/post/${postId}/upvote`, {}, {}, false)
}

export function removeUpvote(postId: PostId) {
  return deleete(`/post/${postId}/upvote`, {}, {}, false)
}