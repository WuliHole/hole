import * as React from 'react'
import { shallow, render, mount } from 'enzyme'
import { Editor, EditorState, convertFromRaw } from 'draft-js'
import { Serlizer } from './serializer'
import { getContentState } from './testUtils'
describe('Editor Serilizer', () => {

  it('serialize ContentState should get RawContentState', () => {
    const rawState = getContentState('hello wolrd')
    const editor = mount(
      <Editor editorState={
        EditorState.createWithContent(convertFromRaw(rawState))
      }
        onChange={ () => { } }
        >
      </Editor>
    )
    const contentState = editor.prop('editorState').getCurrentContent()
    const s = Serlizer.serialize(contentState)
    expect(JSON.stringify(rawState)).toEqual(JSON.stringify(s))
  })

  it('<Editor/> should get right textContent', () => {
    const text = '你好啊 今天开心吗，BUG又少了吗'
    const s = getContentState(text)
    const c = Serlizer.deserialize(s)
    const editor = render(
      <Editor
        onChange={ () => { } }
        editorState={ EditorState.createWithContent(c) }>
      </Editor >
    )
    expect(editor.text()).toEqual(text)
  })

})

