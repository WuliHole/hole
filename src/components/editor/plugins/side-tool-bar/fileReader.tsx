import React = require('react')
import Uploader from '../../../uploader/qiniuUploader'
import ImageIcon from 'material-ui/svg-icons/image/image'
import { ButtonProps } from './interface'
import { SideToolBarButtonStyle } from './defaultStyle'
import addImage from 'draft-js-image-plugin/lib/modifiers/addImage'
import { AddImageBlock } from '../image'

const addImageBlock: AddImageBlock = addImage

export class ImageReader extends React.PureComponent<ButtonProps, void> {

  // create base 64 image before success
  onStart = (tasks: UploaderTask[]) => {
    console.info(tasks)

    const createFileReader = (file: File) => {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        const base64code = e.target.result
        const state = this.props.getEditorState()
        const newState = addImageBlock(state, base64code, {})
        this.props.setEditorState(newState)
      }
      reader.readAsDataURL(file)
    }
    tasks.forEach(task => {
      createFileReader(task.file)
    })
  }

  onTaskFail = (task: UploaderTask) => {
    console.warn(task)
  }

  // replcae base 64 image with
  onTaskSuccess = (task: UploaderTask) => {
    console.info(task)
  }

  preventBubbling = (e: React.MouseEvent<any>) => {
    e.preventDefault()
  }

  render() {
    return <div className={ this.props.theme.buttonWrapper } onMouseDown={ this.preventBubbling }>
      <Uploader
        listener={ {
          onStart: this.onStart,
          onTaskSuccess: this.onTaskSuccess
        } }
      >
        <ImageIcon className={ this.props.theme.button } style={ SideToolBarButtonStyle } type="button" />
      </Uploader>
    </div>
  }
}