import React = require('react')

interface IIconProps {
  name: string
  onClick?: (...args) => any
  style?: React.CSSProperties
}

interface IIconState {

}

export default class Icon extends React.Component<IIconProps, IIconState> {
  constructor(props) {
    super(props)
  }

  render() {
    const style = this.props.style || {}
    const {fontSize, marginRight, otherStyles} = style

    return <i
      className={ `iconfont icon-${this.props.name}` }
      style={ {
        ...otherStyles,
        fontSize: fontSize || '20px',
        marginRight: marginRight || '10px',
        cursor: 'pointer'
      } }
      onClick={ this.props.onClick }
      >
      { this.props.children }
    </i>
  }
}
