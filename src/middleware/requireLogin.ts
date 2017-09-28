import store from '../store/configure-store'
import { openModal } from 'app/actions/modal'

export const requireLogin = (traget, key: string, descriptor: TypedPropertyDescriptor<Function>): any => {
  const originMethod = descriptor.value;
  descriptor.value = function (...args) {
    const emptyToken = !store.getState().session.get('token', false);
    emptyToken ? store.dispatch(openModal()) : originMethod.apply(this, ...args)
  }
  return descriptor
}
