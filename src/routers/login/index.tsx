declare var require
import { notLoggedInRequired } from '../routeUtils'
/* istanbul ignore next */
/* tslint:disable */
export default {
  path: 'login',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./login.page').default)
    })
  },
  onEnter: notLoggedInRequired('/')
}
