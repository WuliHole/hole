import React = require('react')
import Container from '../container'
import { filePublicPathGen } from '../uploader/qiniuUploader'
import { Avatar } from 'material-ui'
import './style.less'
export const defaultAvatar = filePublicPathGen('excited.png', 64)
interface Props {
  src: string
  size?: number
  style?: React.CSSProperties
  onClick?: any
}

export default ({ src = defaultAvatar, size = 64, style = {}, onClick }: Props) => {

  return <div className="inline-block avatar circle" onClick={ onClick }
  >
    { __TEST__
      ? <img src={ src } alt="" />
      : <Avatar src={ src || defaultAvatar }
        size={ size }
        style={ style }
        backgroundColor={ '#fff' }
      /> }
  </div>
}
