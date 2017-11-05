import { EditorPluginBuilder, InAddtionAccepts } from '../interface.plugin'
import { EditorState, ContentBlock, ContentState, getDefaultKeyBinding } from 'draft-js'
import { is } from 'immutable'
import debounce from '../../../../utils/debounce'
import createStore from '../../utils/createStore'
import { TexBlock } from './components/texBlock'
import { KeyMap } from '../../utils/keyMap'

interface PluginConfig {
  setEditorReadonly?: () => void
  setEditorEditable?: () => void
  isReadonly?: () => boolean
}

interface StaticMethod { }

function placeholder() {
  // noop
}

function defaultIsReadonly() {
  return true
}

export const createTexlugin: EditorPluginBuilder<PluginConfig, StaticMethod> = ({
  setEditorReadonly = placeholder,
  setEditorEditable = placeholder,
  isReadonly = defaultIsReadonly,
  }) => {

  const store = createStore()
  const componentProps = {
    store
  }

  function moveCursor(direction: 'up' | 'down', getEditorState) {
    const state: EditorState = getEditorState()
    const content = state.getCurrentContent()
    const selectionKey = state.getSelection().getAnchorKey()
    const hasFocus = state.getSelection().getHasFocus()
    const block = direction === 'up'
      ? content.getBlockBefore(selectionKey)
      : content.getBlockAfter(selectionKey)

    const isTex = isTexBlock(block, content)

    if (isTex && hasFocus) {
      setEditorReadonly()
      const key = block.getKey()
      const callbackName = `focus:${key}`
      store.getItem(callbackName)()
    }
  }

  function handleDelete(e: React.KeyboardEvent<any>) {
    const getEditorState = store.getItem('getEditorState')
    const state: EditorState = getEditorState()
    const selection = state.getSelection()
    if (selection.getAnchorOffset() === 0) {
      const content = state.getCurrentContent()
      const blockBefore = content.getBlockBefore(selection.getAnchorKey())
      if (blockBefore && isTexBlock(blockBefore, content)) {
        moveCursor('up', getEditorState)
        return 'handled'
      }
    }
    return getDefaultKeyBinding(e)
  }

  function isTexBlock(block: ContentBlock, content: ContentState) {
    if (!block || block.getType() !== 'atomic') {
      return
    }

    const entityKey = block.getEntityAt(0)
    if (!entityKey) {
      return
    }

    const entity = content.getEntity(entityKey)
    if (!entity) {
      return
    }

    const data = entity.getData()
    return data.type === 'tex'
  }

  return {
    initialize: ({ setEditorState, getEditorState, getEditorRef }) => {
      store.updateItem('setEditorState', setEditorState)
      store.updateItem('getEditorState', getEditorState)
      store.updateItem('setEditorReadonly', setEditorReadonly)
      store.updateItem('setEditorEditable', setEditorEditable)
      store.updateItem('isReadonly', isReadonly)
      store.updateItem('getEditorRef', getEditorRef)
    },

    onUpArrow(evt: React.KeyboardEvent<any>, { getEditorState, setEditorState }) {
      moveCursor('up', getEditorState)
    },

    onDownArrow(evt: React.KeyboardEvent<any>, { getEditorState, setEditorState }) {
      moveCursor('down', getEditorState)
    },

    keyBindingFn(evt, { getEditorState, setEditorState }) {
      switch (evt.keyCode) {
        case KeyMap.BackSpace:
        case KeyMap.Delete:
          return handleDelete(evt)
      }
      return getDefaultKeyBinding(evt)
    },

    blockRendererFn(block: ContentBlock) {
      const editorState: EditorState = store.getItem('getEditorState')()
      const isTex = isTexBlock(block, editorState.getCurrentContent())
      if (isTex) {
        return {
          component: TexBlock,
          props: componentProps,
          editable: false
        }
      }
    },
    willUnMount() {
    },

    onChange: (editorState) => {
      return editorState
    },
  }
}

export default createTexlugin

