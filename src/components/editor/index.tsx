import React = require('react')
import {
  default as Editor,
  createEditorStateWithText
} from 'draft-js-plugins-editor'
import {
  EditorState,
  ContentBlock,
  getDefaultKeyBinding
} from 'draft-js'

import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin'
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin'
import 'draft-js-inline-toolbar-plugin/lib/plugin.css'
import 'draft-js-side-toolbar-plugin/lib/plugin.css'
import './style.less'

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const sideToolbarPlugin = createSideToolbarPlugin()
const { SideToolbar } = sideToolbarPlugin;
const plugins = [inlineToolbarPlugin, sideToolbarPlugin];

export default class SimpleInlineToolbarEditor
  extends React.Component<any, any> {
  public editor;

  state = {
    editorState: createEditorStateWithText(this.props.text),
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
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
    return (
      <div onClick={ this.focus }>
        <Editor
          editorState={ this.state.editorState }
          onChange={ this.onChange }
          plugins={ plugins }
          decorators={ [] }
          ref={ (element) => { this.editor = element; } }
          blockStyleFn={ this.blockStyleFn }
          handleReturn={ this.handleBeforeInput }
          />
        <SideToolbar />
        <InlineToolbar />
      </div>
    );
  }
}
