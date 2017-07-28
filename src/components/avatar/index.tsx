import React = require('react')
import Container from '../container'
import './style.less'
interface Props {
  src: string
  size?: number
  style?: React.CSSProperties
  onClick?: any
}
export default ({ src = '', size = 64, style = {}, onClick }: Props) => {

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
