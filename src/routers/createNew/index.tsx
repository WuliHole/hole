declare var require
/* istanbul ignore next */
/* tslint:disable */
export default {
  path: 'createNew',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../containers/createNew-page').default)
    })
  }
}
