import { OPEN_MODAL, CLOSE_MODAL } from '../constants/modal.action.types'


export function openModal() {
  return {
    type: OPEN_MODAL,
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  };
}
