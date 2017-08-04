declare var require
/* istanbul ignore next */
/* tslint:disable */
export default {
  path: '/dashboard/setting',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        viewContent: require('./setting').default
      })
    })
  },
}
