import _ = require('jwt-decode')
export const decode = _
export type Second = number


export function isExpried(token: string, max: Second): boolean {
  try {
    const decodedTok: any = decode(token)

    // ms
    const signAt = decodedTok.iat
    if (!signAt) {
      return true
    }

    // s
    const diff = (Date.now() - signAt * 1000) / 1000
    if (diff >= max) {
      return true
    }

    return false
  } catch (e) {
    return true
  }
}
