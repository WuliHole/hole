declare var require
/* istanbul ignore next */
/* tslint:disable */
export default {
  path: 'verify/:token',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./verify-page').default)
    })
  }
}
