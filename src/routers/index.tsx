import App from '../containers/app'
import Article from './article'
import Reading from './reading'
import Verify from './verify'
import CreateNew from './createNew'
export const rootRoute = {
  childRoutes: [{
    path: '/',
    component: App,
    childRoutes: [
      Article,
      Reading,
      Verify,
      CreateNew
    ]
  }]
}
