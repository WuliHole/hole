declare var require
/* istanbul ignore next */
/* tslint:disable */
export default {
  path: '/welcome',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./home.page').default)
    })
  }
}
