import { mount } from 'enzyme'
import * as React from 'react'
import Editor from './index'

describe('Editor Component', () => {
  it('editor should have place holder', () => {
    const s = 'write something'
    const editor = mount(
      <Editor placeholder={ s }>
      </Editor>
    )
    expect(editor.find('.public-DraftEditorPlaceholder-inner')
      .text())
      .toEqual(s)
  })
})
