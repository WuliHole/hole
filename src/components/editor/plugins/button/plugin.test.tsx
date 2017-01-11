import createButtonPlugin from './index'
import { mount, shallow } from 'enzyme'
import * as React from 'react'

describe('Editor Plugin => button', () => {
  it('rightly respond callback', () => {

    const Plugin = createButtonPlugin()
    const Button = Plugin.Button

    const button = shallow(
      <Button></Button>
    )
    const store = button.prop('store')

    const f1 = () => 1
    const f2 = () => 1

    Plugin.initialize({
      getEditorState: f1,
      setEditorState: f2
    })
    expect(store.getItem('getEditorState') === f1).toBe(true)
    expect(store.getItem('setEditorState') === f2).toBe(true)
  })

})
