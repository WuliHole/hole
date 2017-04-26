import { get, post } from '../server'
import { InvalidParamExecption } from '../execptions'
import { urlQueryConstructor } from '../utils/url'
export interface CommentQueryOptions {
  postId: string
}

export function fetch(options: CommentQueryOptions = { postId: '' }) {
  if (!options.postId) {
    throw new InvalidParamExecption('fetch comment')
  }
  return get(`/comment?${urlQueryConstructor(options)}`, {})
}

export interface CreateCommentParams {
  postId: number
  authorId: number
  content: any
}

export function create(params: CreateCommentParams) {
  if (!params) {
    throw new InvalidParamExecption('create comment')
  }
  return post('/comment', params)
}
