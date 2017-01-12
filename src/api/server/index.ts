import 'whatwg-fetch';

export const BASE_URL = '/api';

const HTTPheaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

const http = (method: string) => (path, data = {}) =>
  fetch(BASE_URL + path, {
    method: method,
    headers: HTTPheaders,
    body: JSON.stringify(data)
  }).then(response => response.json())

export const post = http('post')
export const get = http('get')
export const put = http('put')
export const deleete = http('delete')


