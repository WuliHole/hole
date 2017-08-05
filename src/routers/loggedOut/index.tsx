import { notLoggedInRequired } from '../routeUtils'

declare var require
/* istanbul ignore next */
/* tslint:disable */
export default {
  path: '/logged-out',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./logout.page').default)
    })
  },
  onEnter: notLoggedInRequired('/')
}
