import React = require('react')
import { EditorState, ContentBlock } from 'draft-js'
import { DraftHandleValue } from '../interface.editor'
/**
 * This file defined the interface of plugin.
 * Each plugin you created should implement EditorPluginBuilder
 * All details of draft-js-plugin,see https://github.com/draft-js-plugins/draft-js-plugins/blob/master/HOW_TO_CREATE_A_PLUGIN.md
 */

export type EditorPluginBuilder<T, R> = (pluginConfig: T) => InAddtionAccepts & R



interface PluginFunctions {
  // a function returning a list of all the plugins
  getPlugins,
  // a function returning a list of all the props pass into the Editor
  getProps,
  // a function to update the EditorState
  setEditorState: (editorState: EditorState) => void,
  // a function to get the current EditorState
  getEditorState: () => EditorState,
  // a function returning of the Editor is set to readOnly
  getReadOnly,
  // a function which allows to set the Editor to readOnly
  setReadOnly,
  // a function to get the editor reference
  getEditorRef,
}

type Decorator = {
  strategy: any,
  component: (props) => JSX.Element
}

export interface InAddtionAccepts {
  initialize?: (props: PluginFunctions) => void
  onChange?: (editorState: EditorState) => EditorState
  willUnMount?: (props: PluginFunctions) => void
  decorators?: Decorator[]
  keyBindingFn?: (evt: React.KeyboardEvent<any>, props: PluginFunctions) => string
  handleKeyCommand?: (evt: React.KeyboardEvent<any>, props: PluginFunctions) => DraftHandleValue
  blockRenderMap?: (block: ContentBlock) => any
  blockRendererFn?: (block: ContentBlock) => any
  onUpArrow?: (evt: React.KeyboardEvent<any>, props: PluginFunctions) => any
  onDownArrow?: (evt: React.KeyboardEvent<any>, props: PluginFunctions) => any
  onEscape?: (evt: React.KeyboardEvent<any>, props: PluginFunctions) => any
  getAccessibilityProps?: () => { ariaHasPopup: string, ariaExpanded: string }
}


export interface BlockProps {
  alignment: string
  isCollapsedSelection: boolean
  isFocused: boolean
  setAlignment: () => any
  setFocusToBlock: () => any
}