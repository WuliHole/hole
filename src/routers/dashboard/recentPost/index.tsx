declare var require
/* istanbul ignore next */
/* tslint:disable */
export default {
  path: '/dashboard/recent-post',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        viewContent: require('./recentPost').default
      })
    })
  },
}
