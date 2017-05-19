declare var require
/* istanbul ignore next */
/* tslint:disable */
export default {
  path: 'profile/:uid',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./profile.page').default)
    })
  }
}
