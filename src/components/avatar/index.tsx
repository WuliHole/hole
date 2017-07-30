import React = require('react')
import Container from '../container'
import './style.less'
const defaultAvatar = require('../../assets/excited.svg')
interface Props {
  src: string
  size?: number
  style?: React.CSSProperties
  onClick?: any
}
export default ({ src = defaultAvatar, size = 64, style = {}, onClick }: Props) => {
  if (!src) {
    return
  }

  return <img style={ {
    width: `${size}px`,
    height: `${size}px`,
    ...style
  } }
    onClick={ onClick }
    src={ src }
    className="avatar circle " alt="avatar"
  />
}
