declare var require

export default {
  path: 'article',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../containers/article-list-page').default)
    })
  }
}
