import { EditorState } from 'draft-js'
import * as React from 'react'
export interface ButtonProps {
  setEditorState: (editorState: EditorState) => void
  getEditorState: () => EditorState
  theme: {
    active: string
    button: string
    buttonWrapper: string
    separator: string
  }
}

export interface PluginConfig {
  theme?: {
    buttonStyles: string
    blockTypeSelectStyles: string
    toolbarStyles?: string
  }
  structure?: React.ComponentClass<any>[]
}

export interface PluginObject {
  initialize
  onChange
  SideToolbar: React.ComponentClass<any>
}