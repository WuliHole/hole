declare var require
/* istanbul ignore next */
/* tslint:disable */
export default {
  path: '/dashboard',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./dashboard.page').default)
    })
  }
}
