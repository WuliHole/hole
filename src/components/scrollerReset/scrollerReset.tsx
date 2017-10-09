import React = require('react')
import { Children } from 'react'


interface ScrollerResetProps {
  scrollTop?: number
}


export class ScrollerReset extends React.Component<ScrollerResetProps, {}> {
  static defaultProps = {
    scrollTop: 0
  }

  private static _window = window

  private static reset(v) {
    this._window.scrollTo(0, v)
  }

  componentDidMount() {
    ScrollerReset.reset(this.props.scrollTop)
  }

  componentWillUnmount() {
    ScrollerReset.reset(this.props.scrollTop)
  }

  render() {
    return Children.only(this.props.children)
  }
}