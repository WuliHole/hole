declare var require
/* istanbul ignore next */
/* tslint:disable */
export default {
  path: 'post/:postTitle/:id',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../containers/reading-page').default)
    })
  }
}
