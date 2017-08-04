declare var require
import Setting from './setting'
import RecentPost from './recentPost'
/* istanbul ignore next */
/* tslint:disable */
export default {
  // path: 'profile/:uid',
  path: 'dashboard',
  childRoutes: [Setting, RecentPost],
  getComponents(location, cb) {
    require.ensure([], (require) => {
      cb(null, { children: require('./dashboard.page').default, })
    })
  }
}
