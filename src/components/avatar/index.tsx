import React = require('react')
import Container from '../container'
import './style.less'
interface Props {
  src: string
  size?: number
  style?: React.CSSProperties
}
export default ({ src = '', size = 64, style = {} }: Props) => {

  return <img style={ {
    width: `${size}px`,
    height: `${size}px`,
    ...style
  } }
    src={ src }
    className="avatar circle " alt="avatar"
  />
}
