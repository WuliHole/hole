import 'whatwg-fetch';
import { getCookie } from '../../utils/cookie'
export const BASE_URL = '/api';

const csrfToken = getCookie('csrf-token')

const HTTPheaders = {
  'Accept': '*/*',
  'Content-Type': 'application/json',
  'x-csrf-token': csrfToken,
}

const http = (method: string) => (path, data = {}, json = true) =>
  fetch(BASE_URL + path, {
    method: method,
    headers: HTTPheaders,
    credentials: 'same-origin',
    body: JSON.stringify(data)
  }).then(response => json ? response.json() : response)

export const post = http('post')
export const get = http('get')
export const put = http('put')
export const deleete = http('delete')


