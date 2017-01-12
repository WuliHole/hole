import decorateComponentWithProps from 'decorate-component-with-props'
import { default as Button, Ioptions } from './button'
import createStore from '../../utils/createStore'
import { EditorState } from 'draft-js'

export default (config: Ioptions = {}) => {

  const store = createStore({
    isVisible: false,
  })

  const {
    onClick,
    text,
    theme
  } = config

  const buttonProps = {
    store,
    text,
    onClick,
    theme
  }

  return {
    initialize: ({ getEditorState, setEditorState }) => {
      store.updateItem('getEditorState', getEditorState)
      store.updateItem('setEditorState', setEditorState)
    },

    // Re-Render the Button on selection change
    onChange: (editorState: EditorState) => {

      if (
        editorState.getSelection().getHasFocus()
        && editorState.getCurrentContent().getPlainText().length > 0
      ) {
        store.updateItem('isVisible', true)
      } else {
        store.updateItem('isVisible', false)
      }
      return editorState
    },
    Button: decorateComponentWithProps(Button, buttonProps),
  }
}
