export const URL_SEARCH_DELIMITER = '&'
import { Map } from 'immutable'

export const urlQueryConstructor = (params: any): string => {
  if (!params) {
    return ''
  }
  const joinKeyAndVlaue = (value: string, key: string) => `${key}=${value}`
  const tokens = Map(params).map(joinKeyAndVlaue)
  return tokens.join(URL_SEARCH_DELIMITER)
}
