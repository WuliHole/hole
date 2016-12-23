import React = require('react')
interface IIconProps {
  name: string
}

interface IIconState {
 
}

export default class Icon extends React.Component<IIconProps, IIconState> {

  constructor(props) {

    super(props)
  }

  render() {
    return <i className={`iconfont icon-${this.props.name}`}> </i>
  }
}
