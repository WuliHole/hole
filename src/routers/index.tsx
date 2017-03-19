import App from '../containers/app'
import Article from './article'
import Reading from './reading'
import Verify from './verify'

export const rootRoute = {
  childRoutes: [{
    path: '/',
    component: App,
    childRoutes: [
      Article,
      Reading,
      Verify
    ]
  }]
}
