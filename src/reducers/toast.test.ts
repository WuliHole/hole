import { Map } from 'immutable'

import fireAction from '../../test-utils/fire-action'
import toastReducer from '../reducers/toast'

import {
  TOAST_ERROR,
  TOAST_MESSAGE,
  TOAST_REMOVE_FIRST_MESSAGE,
  TOAST_REMOVE_FIRST_ERROR,
} from '../../src/constants/toast.action.types'

let state = toastReducer();

describe('Toast Reducer', () => {

  describe(`on ${TOAST_MESSAGE}`, () => {
    it('size of messages should increse 1', () => {
      const text = 'connected'
      state = fireAction(toastReducer, state, TOAST_MESSAGE, text)
      expect(state.get('messages').get(0)).toEqual(text, state.toJS())
      expect(state.get('messages').size).toBe(1)

    })
  })

  describe(`on ${TOAST_ERROR}`, () => {
    it('size of errors should increse 1', () => {
      const text = 'push error'
      state = fireAction(toastReducer, state, TOAST_ERROR, text)
      expect(state.get('errors').get(0)).toEqual(text, state.toJS())
      expect(state.get('errors').size).toBe(1)
    })
  })

  describe(`on ${TOAST_REMOVE_FIRST_MESSAGE}`, () => {
    it('size of messages should be 0', () => {
      expect(state.get('messages').size).toBe(1)
      state = fireAction(toastReducer, state, TOAST_REMOVE_FIRST_MESSAGE)
      expect(state.get('messages').size).toBe(0)
    })
  })

  describe(`on ${TOAST_REMOVE_FIRST_ERROR}`, () => {
    it('size of errors should be 0', () => {
      expect(state.get('errors').size).toBe(1)
      state = fireAction(toastReducer, state, TOAST_REMOVE_FIRST_ERROR)
      expect(state.get('errors').size).toBe(0)
    })
  })



})
