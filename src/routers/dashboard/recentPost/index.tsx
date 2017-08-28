declare var require
/* istanbul ignore next */
/* tslint:disable */
export default {
  path: '/dashboard/recent-post',
  onEnter: (nextState, replace) => {
    if (!nextState.location.query.public) {
      replace('/dashboard/recent-post?public=true')
    }
  },
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        viewContent: require('./recentPost').default
      })
    })
  },
}
