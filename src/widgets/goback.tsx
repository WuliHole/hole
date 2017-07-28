import * as  React from 'react'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import { HistoryBase } from 'react-router'
import KeyboardBackspace
  from 'material-ui/svg-icons/hardware/keyboard-backspace'

interface IGoBackProps {
  history: HistoryBase
  style?: React.CSSProperties
}

interface IGoBackState {

}

export default class GoBack extends
  React.Component<IGoBackProps, IGoBackState> {
  constructor(props) {
    super(props)
  }

  goBack = () => {
    this.props.history.goBack()
  }

  render() {
    return <IconButton onClick={ this.goBack } >
      <KeyboardBackspace style={ this.props.style } />
    </IconButton>
  }
}

