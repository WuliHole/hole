import { createSelector } from 'reselect'
import { List, Map } from 'immutable'
import { RawDraftContentState } from 'draft-js'
const postsSelector = state => state.posts.get('meta')

type _Post = Map<keyof Post<RawDraftContentState>, any>
type Posts = List<_Post>
export const groupPostsByAuthorId = createSelector(
  [postsSelector],
  (posts: Posts) =>
    posts.groupBy((p: any) => p.get('authorId'))
)

const _findBy = (field: keyof Post<RawDraftContentState>) => (posts: Posts) => {
  return posts.find((p: _Post) => p.get(field))
}

const byId = _findBy('id')
const byAuthorId = _findBy('authorId')
const byTitle = _findBy('title')

export const findPostById = createSelector([postsSelector], byId)
export const findPostByTitle = createSelector([postsSelector], byTitle)
export const findPostByAuthorId = createSelector([postsSelector], byAuthorId)
