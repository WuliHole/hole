import { get, post, getHeaderForJWT } from '../server/';

const LOGIN_ERR_MSG = `
  The username or password you have entered is invalid.
`;

export function login(user) {
  return new Promise((resolve, reject) => {
    return post('/auth/login', user)
      .then((json: any) => resolve(json))
      .then(null, (err) => reject(new Error(LOGIN_ERR_MSG)));
  });
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
