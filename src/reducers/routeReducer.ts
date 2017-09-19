const { routerReducer } = require('react-router-redux');
import p from 'app/components/progress/index'
const INITIAL_STATE = {}

export default function (state = INITIAL_STATE, action = { type: '' }) {
  if (action.type === '@@router/LOCATION_CHANGE' && !(p.status > 0)) {
    p.inc()
  }
  return routerReducer(state, action)
}
