import React = require('react')
import Uploader, { filePublicPathGen } from '../../../uploader/qiniuUploader'
import ImageIcon from 'material-ui/svg-icons/image/image'
import { ButtonProps } from './interface'
import { SideToolBarButtonStyle } from './defaultStyle'
import addImage from 'draft-js-image-plugin/lib/modifiers/addImage'
import { AddImageBlock } from '../image'
import { EditorState } from 'draft-js'

const addImageBlock: AddImageBlock = addImage
type UploadeRecord = { task: UploaderTask, entityKey: string }

export class ImageReader extends React.PureComponent<ButtonProps, {}> {
  record: UploadeRecord[] = []
  // create base 64 image before success
  onStart = (tasks: UploaderTask[]) => {
    console.debug(tasks)

    const createImageBlock = (task: UploaderTask) => {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        const base64code = e.target.result
        const state = this.props.getEditorState()
        const newState = addImageBlock(state, base64code, { valid: false })
        const entityKey = newState.getCurrentContent().getLastCreatedEntityKey()
        this.record.push({ task, entityKey })
        this.props.setEditorState(newState)
      }
      reader.readAsDataURL(task.file)
    }
    tasks.forEach(task => {
      createImageBlock(task)
    })
  }

  onTaskFail = (task: UploaderTask) => {
    console.warn(task)

  }

  // if success , replcae base 64 image with public path of cdn and mark block as valid
  onTaskSuccess = (task: UploaderTask) => {
    console.debug(task)
    const targetRecord = this.record.find(r => r.task === task)
    if (targetRecord) {
      const data = { src: filePublicPathGen(task.result.hash), valid: true }
      this.updateBlockDataFindingByRecord(targetRecord, data)
    }
  }

  updateBlockDataFindingByRecord(record: UploadeRecord, data: any) {
    const contentState = this.props.getEditorState().getCurrentContent()
    const newContent = contentState.mergeEntityData(record.entityKey, data)
    const newEditorState = EditorState.createWithContent(newContent)
    this.props.setEditorState(newEditorState)
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