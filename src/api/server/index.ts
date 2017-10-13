import 'whatwg-fetch';
import { getCookie } from '../../utils/cookie'
import { getToken } from 'app/store/configure-store'
export const BASE_URL = '/api';

const csrfToken = getCookie('csrf-token')

export const BaseHeaders = {
  'Accept': '*/*',
  'Content-Type': 'application/json',
  'x-csrf-token': csrfToken,
}

// json web token header
export const getHeaderForJWT = (token: string) => {
  if (token) {
    if (typeof token !== 'string') {
      console.error('Unexcept token')
    }
    return { authorization: `Bearer ${token}` }
  }
  return {}
}

function shouldHaveBody(method: string) {
  return ['get', 'head'].indexOf(method) === -1
}

const http = (method: string) => (path, data = {}, header = {}, json = true) => {
  return fetch(BASE_URL + path, {
    method: method,
    headers: { ...BaseHeaders, ...getHeaderForJWT(getToken()), ...header },
    credentials: 'same-origin',
    body: shouldHaveBody(method) && JSON.stringify(data)
  }).then(response => {
    if (!response.ok) {

      try {
        const body = response.json()
        return body
      } catch (e) {
        return {
          errMsg: response.statusText,
          code: response.status
        }
      }
    }

    return json ? response.json() : response
  })
}

export const post = http('post')
export const get = http('get')
export const put = http('put')
export const deleete = http('delete')


