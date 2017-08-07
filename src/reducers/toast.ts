import {
  TOAST_ERROR,
  TOAST_MESSAGE,
  TOAST_REMOVE_FIRST_MESSAGE,
  TOAST_REMOVE_FIRST_ERROR
} from '../constants/toast.action.types'
import { fromJS } from 'immutable'

const initial_state = fromJS({
  messages: [],
  errors: []
})

export default function toastReducer(state = initial_state,
  action = { type: '', payload: null }) {
  switch (action.type) {

    case TOAST_ERROR:

      return state.merge({
        errors: state.get('errors').push(action.payload)
      })

    case TOAST_MESSAGE:
      return state.merge({
        messages: state.get('messages').push(action.payload)
      })

    case TOAST_REMOVE_FIRST_ERROR:
      return state.merge({
        errors: state.get('errors').shift()
      })

    case TOAST_REMOVE_FIRST_MESSAGE:
      return state.merge({
        messages: state.get('messages').shift()
      })


    default:
      return state;
  }
}
