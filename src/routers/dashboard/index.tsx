declare var require
import t from './routers/profile'
/* istanbul ignore next */
/* tslint:disable */
export default {
  // path: 'profile/:uid',
  path: 'dashboard',
  childRoutes: [t],
  getComponents(location, cb) {
    require.ensure([], (require) => {
      cb(null, { children: require('./dashboard.page').default, })
    })
  }
}
