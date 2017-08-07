import * as types from '../constants/toast.action.types'


export function message(text: string) {
  if (!text) {
    return
  }

  return {
    type: types.TOAST_MESSAGE,
    payload: text
  }
}

export function error(text: string) {
  if (!text) {
    return
  }

  return {
    type: types.TOAST_ERROR,
    payload: text
  }
}

export function removeFirst(type: 'message' | 'error') {
  let actionType = 'TOAST/REMOVE_FIRST_'

  if (type === 'message') {
    actionType += 'MESSAGE'
  } else if (type === 'error') {
    actionType += 'ERROR'
  } else {
    return
  }

  return {
    type: actionType
  }
}
