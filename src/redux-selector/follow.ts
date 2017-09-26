import { getUidFromRouter } from './router'
import { selectUserInfo, UserMap } from './profile'
import { createSelector } from 'reselect'
import { Map, List } from 'immutable'
const getFollowers = state => state.follow.get('followers')
const getFollowings = state => state.follow.get('followings')


export type Followers = List<Map<keyof User, any>>
export type Followings = List<Map<keyof User, any>>

export const selectFollowersForUser = createSelector(
  [getFollowers, getUidFromRouter, selectUserInfo],
  (followers: Map<string, any>, userId: Uid, userMap: UserMap): Followers => {
    const followerIds: string[] = followers.getIn([userId, 'followers'])
    return followerIds
      ? List(followerIds.map(id => userMap.get(id)))
      : List()
  }
)

export const selectFollowingsForUser = createSelector(
  [getFollowings, getUidFromRouter, selectUserInfo],
  (followings: Map<string, any>, userId: Uid, userMap: UserMap): Followings => {
    const followingIds = followings.getIn([userId, 'followings'])
    return followingIds
      ? List(followingIds.map(id => userMap.get(id)))
      : List()
  }
)