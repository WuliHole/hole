import { get, post } from '../server'
import { InvalidParamExecption } from '../execptions'
import { urlQueryConstructor } from '../utils/url'
export interface CommentQueryOptions {
  limit: number
  offset?: number
}

export function getCommetList(
  postId: number,
  options: CommentQueryOptions = { limit: 10 }
) {
  if (!postId) {
    throw new InvalidParamExecption('fetch comment')
  }
  return get(`/post/${postId}/comments?${urlQueryConstructor(options)}`, {})
}

export interface CreateCommentParams {
  postId: number
  postTitle: string
  authorId: number
  content: any
  postOwnerId: number
}

export function create(params: CreateCommentParams) {
  if (!params) {
    throw new InvalidParamExecption('create comment')
  }
  return post('/comment', params)
}
