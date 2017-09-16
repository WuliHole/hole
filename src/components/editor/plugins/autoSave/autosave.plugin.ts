import { EditorPluginBuilder, InAddtionAccepts } from '../interface.plugin'
import { EditorState } from 'draft-js'
import { is } from 'immutable'
import debounce from '../../../../utils/debounce'

interface PluginConfig {
  /**
   * save function, async or sync
   */
  saveAction: (editorState: EditorState) => any
  /**
   * define how long the saveAction  be invoked
   * @default 500
   */
  debounceTime?: number
}

interface Method {
  save: () => void
  isDifferentState: () => boolean
}

export type AutoSavePlugin = InAddtionAccepts & Method

export const createAutoSavePlugin: EditorPluginBuilder<PluginConfig, Method> = ({ debounceTime = 500, saveAction }) => {


  if (typeof saveAction !== 'function') {
    throw new TypeError(`[createAutoSavePlugin]: saveAction is not function`)
  }

  let prevState: EditorState
  let currentState: EditorState
  saveAction = debounce(saveAction, debounceTime)

  function isDifferentState() {
    return currentState && !is(prevState.getCurrentContent(), currentState.getCurrentContent())
  }

  function save() {
    if (isDifferentState()) {
      saveAction(currentState)
    }
  }

  return {
    initialize: ({ setEditorState, getEditorState }) => {
      const state = getEditorState()
      prevState = state
      currentState = state
    },
    willUnMount() {
      prevState = null
      currentState = null
    },
    onChange: (editorState) => {
      prevState = currentState
      currentState = editorState
      save()
      return editorState
    },
    save,
    isDifferentState
  }
}

export default createAutoSavePlugin
