import { createSelector } from 'reselect'
import { List } from 'immutable'
import { RawDraftContentState } from 'draft-js'
const postsSelector = state => state.posts.get('meta')

export const groupPostsByAuthorId = createSelector(
  [postsSelector],
  (posts: List<Post<RawDraftContentState>>) =>
    posts.groupBy((p: any) => p.get('authorId'))
)

