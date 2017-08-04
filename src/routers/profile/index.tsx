declare var require
import CommonAppBar from '../../widgets/commonAppBar'
/* istanbul ignore next */
/* tslint:disable */
export default {
  // path: 'profile/:uid',
  path: '/profile/:uid',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        children: require('./profile.page').default,
        profileAppBar: CommonAppBar
      })
    })
  },
}
