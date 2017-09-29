import React = require('react')
import { EditorState } from 'draft-js'
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
  getAccessibilityProps?: () => { ariaHasPopup: string, ariaExpanded: string }
}
