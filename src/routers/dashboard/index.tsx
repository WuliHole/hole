declare var require
import Setting from './setting'
import RecentPost from './recentPost'
import store from '../../store/configure-store'
import toJS from '../../utils/immutable-to-js'
import isLogin from '../../store/isLogin'
/* istanbul ignore next */
/* tslint:disable */
export default {
  // path: 'profile/:uid',
  path: 'dashboard',
  onEnter: (nextState, replace) => {
    const jsStore = toJS(store.getState()) as any
    if (!isLogin()) {
      replace(`/`)
    }
  },
  childRoutes: [Setting, RecentPost],
  getComponents(location, cb) {
    require.ensure([], (require) => {
      cb(null, { children: require('./dashboard.page').default, })
    })
  }
}
