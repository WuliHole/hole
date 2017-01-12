import { shallow, mount } from 'enzyme'
import * as React from 'react'
import Button from './button'
import createStore from '../../utils/createStore'

describe('Editor Plugin Button Component', () => {

  it('should  render text test-button', () => {
    const text = 'text-button'
    const store = createStore()
    const button = mount(
      <Button
        store={ store }
        text={ text }
        isVisible={ true }
        ></Button>
    )
    expect(button.prop('text')).toEqual(text)
    expect(button.text()).toBe(text)
  })

  it('should respond to click events', () => {

    const onButtonClick = jasmine.createSpy('onButtonClick');

    const wrapper = mount(
      <Button
        store={ createStore() }
        onClick={ onButtonClick }
        isVisible={ true }
        />)
    const button = wrapper.find('button')
    button.simulate('click')
    expect(onButtonClick).toHaveBeenCalled()
  })
})
