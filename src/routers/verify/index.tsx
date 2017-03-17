declare var require

/* tslint:disable */
export default {
  path: 'verify/:token',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../containers/verify-page').default)
    })
  }
}
