
import React = require('react')
import * as cls from 'classnames'

interface IBoardPropss {
  backgroundColor?: string
  width?: string
  height?: string
  center?: boolean
  style?: React.CSSProperties
  children?
}

export default function Board({
  backgroundColor = '#FFFFFF',
  width = '100vw',
  height = '100vh',
  center = true,
  children = null,
  style = {}
}: IBoardPropss) {
  return <div
    className={ cls({ 'mx-auto': center, }) }
    style={ { backgroundColor, width, height, ...style } }
  >
    { children }
  </div >
}
