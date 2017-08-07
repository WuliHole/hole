import {
  TOAST_REMOVE_FIRST_ERROR,
  TOAST_REMOVE_FIRST_MESSAGE,
  TOAST_MESSAGE,
  TOAST_ERROR
}
  from './../constants/toast.action.types';
import { message, error, removeFirst } from './toast'

describe('Toast Actions', () => {
  describe(`Create new message`, () => {
    it('one message be created', () => {

      const msg = 'hello world'
      expect(message(msg)).toEqual({
        type: TOAST_MESSAGE,
        payload: msg
      }, message(msg))
    })
  })

  describe('Create new error', () => {
    it('one error be created', () => {

      const msg = 'hello error'
      expect(error(msg)).toEqual({
        type: TOAST_ERROR,
        payload: msg
      }, message(msg))
    })
  })

  describe('Hide toast ', () => {
    it('should create type TOAST_REMOVE_FIRST_MESSAGE', () => {
      const excepted = {
        type: TOAST_REMOVE_FIRST_MESSAGE,
      }
      expect(removeFirst('message')).toEqual(excepted, removeFirst('message'))
    })

    it('should create type TOAST_REMOVE_FIRST_ERROR', () => {
      const excepted = {
        type: TOAST_REMOVE_FIRST_ERROR,
      }
      expect(removeFirst('error')).toEqual(excepted, removeFirst('error'))
    })

  })
})