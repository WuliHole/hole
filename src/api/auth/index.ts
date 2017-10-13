import { get, post, getHeaderForJWT } from '../server/';

export function login(user) {
  return post('/auth/login', user)
}

export function signup(email: string) {
  return post('/auth/signup', { email })
}

export function logout(tok) {
  const header = getHeaderForJWT(tok)
  return get('/auth/signout', {}, header)
}

export function refreshToken(tok: string) {
  const header = getHeaderForJWT(tok)
  return get('/auth/token/refresh', {}, header)
}
