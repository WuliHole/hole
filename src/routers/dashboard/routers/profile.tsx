declare var require
/* istanbul ignore next */
/* tslint:disable */
export default {
  path: '/dashboard/123',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        viewContent: require('../../profile/profile.page').default
      })
    })
  },
}
