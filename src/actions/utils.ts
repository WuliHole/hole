/**
 *  if has error will dispatch reject error.
 *  ex :
 *     type:App/CREATE_POST_ERROR
 */
export function isRejectedAction(res) {
  return /ERROR/.test(res.type) || !!res.payload.errMsg
}
