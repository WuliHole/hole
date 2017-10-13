import { post, put, get, deleete } from '../server'
import assert from '../../utils/assert'
export function setPassword(password: string) {
  assert(password, 'illegal param password')
  return post('/user/setPassword', { password })
}


export function update(data = {}) {
  return put(`/user`, data)
}

export function getProfile(uid) {
  return get(`/user/${uid}/profile`)
}


export function follow(uid: Uid) {
  return get(`/user/${uid}/follow`, {}, {}, false)
}

export function unfollow(uid: Uid) {
  return deleete(`/user/${uid}/follow`, {}, {}, false)
}

export function getPublishedPostsForUser(uid) {
  return get(`/user/${uid}/posts/published`)
}

export function getDraftForUser(uid) {
  return get(`/user/${uid}/posts/draft`)
}
