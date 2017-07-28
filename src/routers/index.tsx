import App from '../containers/app'
import Article from './article'
import Reading from './reading'
import Verify from './verify'
import CreateNew from './createNew'
import Profile from './profile'
import Post from './post'
import Login from './login'
import Signup from './signup'
import store from '../store/configure-store'
import isLogin from '../store/isLogin'
import toJS from '../utils/immutable-to-js'
import Home from './home'
import Logout from './loggedOut'
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
          replace(`profile/${user.id}`)
        }
      }
    },
    childRoutes: [
      Home,
      Login,
      Signup,
      Logout,
      Article,
      Reading,
      Verify,
      CreateNew,
      Profile,
      Post
    ]
  }]
}
