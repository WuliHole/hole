import React = require('react')
import Transition = require('react-addons-css-transition-group')
import './trans.less'

interface Props {
  children?: any
  transitionName?: string
  component?: string
  transitionAppear?: boolean
  transitionAppearTimeout?: number
  transitionEnterTimeout?: number
  transitionLeaveTimeout?: number
}

export default ({
  children = null,
  transitionName = 'fadeIn',
  component = 'div',
  transitionAppear = true,
  transitionAppearTimeout = 300,
  transitionEnterTimeout = 500,
  transitionLeaveTimeout = 300,
}: Props) => (
    <Transition
      transitionName={ transitionName }
      component={ component }
      transitionAppear={ transitionAppear }
      transitionAppearTimeout={ transitionAppearTimeout }
      transitionEnterTimeout={ transitionEnterTimeout }
      transitionLeaveTimeout={ transitionLeaveTimeout }
    >
      { children }
    </Transition>
  )
