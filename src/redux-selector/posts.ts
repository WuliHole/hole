import { createSelector } from 'reselect'
import { List, Map } from 'immutable'
import { RawDraftContentState } from 'draft-js'
import { getIdFromRouter, getTitlefromRouter } from './router'
const postsSelector = state => state.posts.get('meta')

type _Post = Map<keyof Post<RawDraftContentState>, any>
type Posts = List<_Post>

export const groupPostsByAuthorId = createSelector(
  [postsSelector],
  (posts: Posts) => {
    return posts.groupBy((p: any, index) => {
      window[`$${index}`] = posts
      return p.get('authorId')
    })
  }
)

const _findBy = (
  field: keyof Post<RawDraftContentState>,
) => (posts: Posts, value) => {
  return posts.find((p) => p.get(field) === value)
}


const byId = _findBy('id')
const byTitle = _findBy('title')

export const findPostById = createSelector(
  [postsSelector, getIdFromRouter], byId
)

export const findPostByTitle = createSelector(
  [postsSelector, getTitlefromRouter], byTitle
)

