import React = require('react')
import Container from '../container'
import './style.less'
interface Props {
  src: string
  size?: number
}

export default ({src = '', size = 64}: Props) => {
  return <img style={ {
    width: `${size}px`,
    height: `${size}px`
  } }
    src={ src }
    className="avatar circle float-left" alt="avatar"
    />
}
