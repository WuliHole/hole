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
import { DraftHandleValue } from './interface.editor'
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

  // fix For issue:https://github.com/WuliHole/hole/issues/18
  handleReturn = (e): DraftHandleValue => {
    const blockKey = this.state.editorState.getSelection().getAnchorKey()
    const block = this.state.editorState.getCurrentContent().getBlockForKey(blockKey)
    if (block && block.getType() === 'atomic') {
      return 'handled'
    }
    return 'not-handled'
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
          handleReturn={ this.handleReturn }
          decorators={ this.props.decorators || [] }
          ref={ (element) => { this.editor = element; } }
          blockStyleFn={ this.blockStyleFn }
          placeholder={ placeholder }
          readOnly={ this.props.readOnly }
        />
        { this.editor && this.props.children }
      </div>
    );
  }
}
