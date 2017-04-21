declare var require

/* tslint:disable */
export default {
  path: 'posts/:postTitle/:id',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../containers/reading-page').default)
    })
  }
}
