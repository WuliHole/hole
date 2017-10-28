import App from '../containers/app'
import Reading from './reading'
import Verify from './verify'
import Editing from './editing'
import Profile from './profile'
import Post from './post'
import Login from './login'
import Signup from './signup'
import Home from './home'
import Logout from './loggedOut'
import DashBoard from './dashboard'
import isLogin from '../store/isLogin'
import store from '../store/configure-store'
import toJS from '../utils/immutable-to-js'

/* istanbul ignore next */
export const rootRoute = {
  childRoutes: [{
    path: '/',
    component: App,
    indexRoute: {
      onEnter: (nextState, replace) => {
        const jsStore = toJS(store.getState()) as any
        if (!isLogin()) {
          replace(`/welcome`)
        } else {
          const user = jsStore.session.user
          replace(`/dashboard/recent-post?public=true`)
        }
      }
    },
    childRoutes: [
      Home,
      Login,
      Signup,
      Logout,
      Reading,
      Verify,
      Editing,
      Profile,
      Post,
      DashBoard
    ]
  }]
}
