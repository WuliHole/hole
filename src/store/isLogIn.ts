import store from './configure-store'
import toJs from '../utils/immutable-to-js'
export default () => {
  const jsStore = toJs(store.getState()) as any
  const session = jsStore.session
  return !!(session && session.user && session.user.nickName)
}