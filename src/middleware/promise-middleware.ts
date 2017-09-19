import isPromise from '../utils/is-promise';
import p from 'app/components/progress/index'
const objectAssign = require('object-assign');


export default function promiseMiddleware({ dispatch }) {
  return next => action => {
    if (!isPromise(action.payload)) {
      return next(action);
    }

    const { types, payload, meta } = action;
    const { promise, data } = payload;
    const [PENDING, FULFILLED, REJECTED] = types;

    /**
     * Dispatch the pending action
     */
    dispatch(objectAssign({},
      { type: PENDING },
      data ? { payload: data } : {},
      meta ? { meta } : {}
    ));
    p.inc()
    /**
     * If successful, dispatch the fulfilled action, otherwise dispatch
     * rejected action.
     */
    return promise.then(
      result => {
        p.done()
        return dispatch({
          type: result.errMsg ? REJECTED : FULFILLED,
          payload: result,
          meta,
        });
      },
      error => {
        p.done()
        return dispatch({
          type: REJECTED,
          payload: error,
          meta,
        });
      }
    );
  };
}
