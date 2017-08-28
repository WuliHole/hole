import { createSelector } from 'reselect'
import { List, Map } from 'immutable'
import { RawDraftContentState } from 'draft-js'
import { getIdFromRouter, getTitlefromRouter } from './router'
const postsSelector = state => state.posts.get('meta')

type _Post = Map<keyof Post<RawDraftContentState>, any>
type Posts = Map<string, _Post>
type Field = keyof Post<RawDraftContentState>
export const groupPostsByAuthorId = createSelector(
  [postsSelector],
  (posts: Posts) => posts.groupBy((p, index) => p.get('authorId'))
)

const _findBy = (field: Field | Field[], ) => (posts: Posts, value) => {
  return posts.find((p) => {

    return p.get((field as Field)) === value

  })
}


const byId = _findBy('id')
const byTitle = _findBy('title')

export const findPostById = createSelector(
  [postsSelector, getIdFromRouter], byId
)

export const findPostByTitle = createSelector(
  [postsSelector, getTitlefromRouter], byTitle
)

