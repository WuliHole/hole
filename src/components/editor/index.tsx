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
import linkify from 'draft-js-linkify-plugin'
import createCodePlugin from './plugins/code-highlight/code-light.plugin'
import { is } from 'immutable'
import './draft.less'
import './style.less'
interface EditorProps {
  plugins?: any[]
  decorators?: any[]
  editorState?: EditorState
  placeholder?: string
  onChange?: (s: EditorState) => any
  readonly?: boolean
  autoFocus?: boolean
}

const plg = [linkify(), createCodePlugin({})]
export default class HoleEditor
  extends React.Component<EditorProps, any> {
  public static placeholder = ' '
  public editor

  serializer = Serlizer.serialize

  state = {
    editorState: this.props.editorState
      ? this.props.editorState
      : EditorState.createEmpty(),
  };

  /**
   * A bug was here .
   * If call the method(focus) ,decorators will not work
   */
  componentDidMount() {
    // this.focus()
  }

  onChange = (editorState) => {


    this.setState({
      editorState,
    });

    if (this.props.onChange) {
      this.props.onChange(editorState)
    }
  };


  focus = () => {
    this.editor.getEditorRef().focus()
  };

  hasFocus() {
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

  onTab = (e: Event): DraftHandleValue => {
    // prevent default page jump
    e.preventDefault()
    return 'handled'
  }

  render() {
    const placeholder = this.props.placeholder || HoleEditor.placeholder
    return (
      <div >
        <Editor
          ref={ e => this.editor = e }
          editorState={ this.state.editorState }
          onChange={ this.onChange }
          plugins={ [...plg, ...this.props.plugins] || [] }
          handleReturn={ this.handleReturn }
          decorators={ this.props.decorators || [] }
          blockStyleFn={ this.blockStyleFn }
          placeholder={ placeholder }
          readOnly={ this.props.readonly }
          onTab={ this.onTab }
        >

        </Editor>
        { this.props.children }
      </div>
    );
  }
}
