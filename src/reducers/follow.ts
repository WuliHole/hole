import { fromJS, Map, List } from 'immutable'
import * as Types from 'app/constants/follow.action.types'

const INITIAL_STATE = fromJS({
  isLoading: false,
  followers: {
    '-1': {           // placeholder
      next: '',
      followers: []
    }
  },
  followings: {
    '-1': {
      next: '',
      followings: []
    }
  }
})

function followReducer(state = INITIAL_STATE, action = { type: '', payload: null }) {
  const data = action.payload && action.payload.data
  const followers = state.get('followers') as Map<string, any>
  const followings = state.get('followings') as Map<string, any>
  switch (action.type) {
    case Types.GET_USER_FOLLOWERS_PENDING:
    case Types.GET_USER_FOLLOWINGS_PENDING:
      return state.merge({
        isLoading: true
      })

    case Types.GET_USER_FOLLOWERS_SUCCESS:
      return state.merge({
        followers: followers
          .setIn([action.payload.id, 'followers'], fromJS(action.payload.followers))
          .setIn([action.payload.id, 'next'], action.payload.next),
        isLoading: false
      })

    case Types.GET_USER_FOLLOWINGS_SUCCESS:
      return state.merge({
        followers: followers
          .setIn([action.payload.id, 'followings'], fromJS(action.payload.followings))
          .setIn([action.payload.id, 'next'], action.payload.next),
        isLoading: false
      })

    case Types.GET_NEXT_USER_FOLLOWERS_SUCCESS:
      return state.merge({
        followers: followers
          .updateIn([action.payload.id, 'followers'], makeUpdater(action.payload, 'followers'))
          .updateIn([action.payload.id, 'next'], action.payload.next),
        isLoading: false
      })

    case Types.GET_NEXT_USER_FOLLOWINGS_SUCCESS:
      return state.merge({
        followings: followings
          .updateIn([action.payload.id, 'followings'], makeUpdater(action.payload, 'followings'))
          .updateIn([action.payload.id, 'next'], action.payload.next),
        isLoading: false
      })

    default:
      return state
  }
}


const makeUpdater = (payload, filed) => v => v ? v.concat(fromJS(payload[filed])) : fromJS(payload[filed])

export default followReducer