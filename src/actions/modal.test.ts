import {openModal, closeModal} from './modal'
import { OPEN_MODAL, CLOSE_MODAL } from '../constants/modal.action.types'

describe('Modal actions', () => {
  it('should open modal', (done) => {
    expect(openModal()).toEqual({
      type: OPEN_MODAL
    })
    done()
  })

  it('should close modal', (done) => {
    expect(closeModal()).toEqual({
      type: CLOSE_MODAL
    })
    done()
  })
})
