import * as  React from 'react'

import {
  HeadlineOneButton,
  HeadlineTwoButton,
  BlockquoteButton,
  CodeBlockButton,
  UnorderedListButton,
  OrderedListButton,
} from 'draft-js-buttons'
import { ImageReader } from './fileReader'
import { EditorState } from 'draft-js'
import BlockTypeSelect from 'draft-js-side-toolbar-plugin/lib/components/BlockTypeSelect'
import createPlugin from 'draft-js-side-toolbar-plugin'
import { PluginConfig, PluginObject } from './interface'


export const DefaultBlockTypeSelect = ({ getEditorState, setEditorState, theme }) => (
  <BlockTypeSelect
    getEditorState={ getEditorState }
    setEditorState={ setEditorState }
    theme={ theme }
    structure={ [
      HeadlineOneButton,
      HeadlineTwoButton,
      UnorderedListButton,
      OrderedListButton,
      BlockquoteButton,
      CodeBlockButton,
      ImageReader,
    ] }
  />
);


export const createSideToolBarPlugin = (config: PluginConfig = {}): PluginObject => {
  const {
    structure = [DefaultBlockTypeSelect],
    theme = undefined
  } = config
  return createPlugin({ structure, theme })
}

