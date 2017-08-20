import React = require('react')
import {
  default as Editor,
  createEditorStateWithText
} from 'draft-js-plugins-editor'
import {
  EditorState,
  ContentBlock,
  getDefaultKeyBinding,
  convertToRaw

} from 'draft-js'
import { Serlizer } from './utils/serializer'
import 'draft-js-inline-toolbar-plugin/lib/plugin.css'
import 'draft-js-side-toolbar-plugin/lib/plugin.css'
import 'draft-js-image-plugin/lib/plugin.css'
import 'draft-js-alignment-plugin/lib/plugin.css'

import './draft.less'
import './style.less'

interface EditorProps {
  plugins?: any[]
  decorators?: any[]
  editorState?: EditorState
  placeholder?: string
  onChange?: (s: EditorState) => any
  readOnly?: boolean
}

export default class HoleEditor
  extends React.Component<EditorProps, any> {
  public editor;
  public static placeholder = '写点儿什么'

  serializer = Serlizer.serialize

  state = {
    editorState: this.props.editorState
      ? this.props.editorState
      : EditorState.createEmpty(),
  };

  onChange = (editorState) => {
    if (this.editor) {
      this.setState({
        editorState,
      });

      if (this.props.onChange) {
        this.props.onChange(editorState)
      }
    }
  };


  focus = () => {
    this.editor.focus();
  };

  isFocus() {
    return this.state.editorState
      .getSelection()
      .getHasFocus()
  }

  private blockStyleFn = (block: ContentBlock) => {
    const type = block.getType()
    if (type === 'unstyled') {
      return 'paragraph'
    }
    return null
  }

  private handleBeforeInput = (e) => {
    e.preventDefault()
    return true
  }

  render() {
    const isFocus = this.isFocus()
    const placeholder = this.props.placeholder || HoleEditor.placeholder
    return (
      <div >
        <Editor
          editorState={ this.state.editorState }
          onChange={ this.onChange }
          plugins={ this.props.plugins || [] }
          decorators={ this.props.decorators || [] }
          ref={ (element) => { this.editor = element; } }
          blockStyleFn={ this.blockStyleFn }
          handleReturn={ this.handleBeforeInput }
          placeholder={ placeholder }
          readOnly={ this.props.readOnly }
        />
        { this.editor && this.props.children }
      </div>
    );
  }
}
