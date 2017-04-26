import { post, put, get } from '../server'
import assert from '../../utils/assert'

export function setPassword(password: string) {
  assert(password, 'illegal param password')
  return post('/user/setPassword', { password })
}


export function update(data = {}) {
  return put(`/user`, data)
}

export function getProfile(uid) {
  return new Promise((resolve, reject) => {
    return get(`/user/${uid}/profile`)
      .then((json: any) => resolve(json))
      .then(null, (err) => reject(err));
  });
}

export function getPosts(uid) {
  return new Promise((resolve, reject) => {
    return get(`/user/${uid}/posts`)
      .then((json: any) => resolve(json))
      .then(null, (err) => reject(err));
  });
}
