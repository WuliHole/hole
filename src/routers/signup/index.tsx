declare var require
/* istanbul ignore next */
/* tslint:disable */
export default {
  path: 'signup',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./signup.page').default)
    })
  }
}
