import { EditorPluginBuilder, InAddtionAccepts } from '../interface.plugin'
import { EditorState, ContentBlock, ContentState } from 'draft-js'
import { is } from 'immutable'
import debounce from '../../../../utils/debounce'
import createStore from '../../utils/createStore'
import { TexBlock } from './components/texBlock'
import { KeyMap } from '../../utils/keyMap'
interface PluginConfig {
  setEditorReadonly: () => void
  setEditorEditable: () => void
  isReadonly: () => boolean
}

interface StaticMethod {
}

export const createTexlugin: EditorPluginBuilder<PluginConfig, StaticMethod> = ({
  setEditorReadonly,
  setEditorEditable,
  isReadonly,
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
      /* tslint:disable */
      const callbackName = `focus:${key}`
      store.getItem(callbackName)()
    }
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
      store.updateItem('getEditorRef', getEditorRef)
    },

    onUpArrow(evt: React.KeyboardEvent<any>, { getEditorState, setEditorState }) {
      moveCursor('up', getEditorState)
    },

    onDownArrow(evt: React.KeyboardEvent<any>, { getEditorState, setEditorState }) {
      moveCursor('down', getEditorState)
    },

    keyBindingFn(evt: React.KeyboardEvent<any>, { getEditorState, setEditorState }) {

    },

    blockRendererFn(block: ContentBlock) {
      const editorState: EditorState = store.getItem('getEditorState')()
      const isTex = isTexBlock(block, editorState.getCurrentContent())
      /* tslint:disable */
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

