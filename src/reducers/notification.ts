import * as Types from 'app/constants/feed.action.types'

const INITIAL_STATE = {
  data: [],
  next: null,
  unread: 0,
  unseen: 0,
  fetching: false
}

function feedReducer(state = INITIAL_STATE, action = { type: '', payload: null }) {
  switch (action.type) {

    case Types.INITIAL_LOAD_NOTIFICATIONS_ERROR:
    case Types.LOAD_NEXT_NOTIFICATIONS_ERROR:
      return { ...state, fetching: false }

    case Types.INITIAL_LOAD_NOTIFICATIONS_PENDING:
    case Types.LOAD_NEXT_NOTIFICATIONS_PENDING:
      return { ...state, fetching: true }

    case Types.INITIAL_LOAD_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        fetching: false,
        unread: action.payload.unread
      }

    case Types.LOAD_NEXT_NOTIFICATIONS_SUCCESS:
      return { ...state, data: state.data.concat(action.payload.data), fetching: false }

    case Types.CLEAR_UNREAD_NOTIFICATION:
      return {
        ...state,
        unread: 0
      }

    default:
      return state
  }
}

export default feedReducer