import React = require('react')
import Sigma from 'material-ui/svg-icons/editor/functions'
import { ButtonProps } from '../../side-tool-bar/interface'
import { SideToolBarButtonStyle } from '../../side-tool-bar/defaultStyle'
import createBlockStyleButton from '../../side-tool-bar/utils/createBlockStyleButton'
import { EditorState } from 'draft-js'
import { addTexBlock } from '../modifiers/addTexBlock'
interface TexButtonProps {

}

interface TexButtonState {

}

class TexButton extends React.Component<TexButtonProps, TexButtonState> {

  render() {
    return <Sigma style={ SideToolBarButtonStyle } type="button" />
  }
}


export default createBlockStyleButton({
  blockType: 'atomic',
  children: <TexButton />,
  onClick: (e, { getEditorState, setEditorState }) => {
    const editorState = getEditorState()
    setEditorState(addTexBlock(editorState))
  }
})