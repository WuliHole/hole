import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../constants/modal.action.types';
import { fromJS } from 'immutable';


const INITIAL_STATE = fromJS({
  opened: false,
});

function modalReducer(state = INITIAL_STATE, action = { type: '' }) {
  switch (action.type) {
    case OPEN_MODAL:
      return state.update('opened', () => true);
    case CLOSE_MODAL:
      return state.update('opened', () => false);
    default:
      return state;
  }
}


export default modalReducer;
