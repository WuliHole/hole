type Uid = string | number
interface User {
  avatar: string,
  name: string,
  verified: boolean,
  followersCount?: number,
  followingCount?: number,
  followedUser?: boolean,
  nickName: string,
  bio: string,
  id: number,
  createdAt: string
}
