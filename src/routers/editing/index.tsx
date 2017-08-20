import { loginRequired } from '../routeUtils'
declare var require

/* istanbul ignore next */
/* tslint:disable */
export default {
  path: 'post/:pid/edit',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../containers/editing.page').default)
    })
  },
  onEnter: loginRequired('/login')
}
