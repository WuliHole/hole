declare var require
/* tslint:disable */
/* istanbul ignore next */
export default {
  path: '@:userName/:articleTitle/:id',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../containers/reading-page').default)
    })
  }
}
