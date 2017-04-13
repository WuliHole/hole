import { post, put } from '../server'
import assert from '../../utils/assert'

export function setPassword(userId: number, password: string) {
  assert(userId, 'illegal param userId')
  assert(password, 'illegal param password')
  return post('/user/setPassword', { password })
}


export function update(data = {}) {
  return put(`/user`, data)
}
