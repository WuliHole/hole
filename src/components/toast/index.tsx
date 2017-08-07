import { List } from 'immutable'
import * as React from 'react'
import Alert from '../alert'
import Transition from '../transition'
import './toast.less'

interface ToastProps {
  messages: List<string>
  error: List<string>
}

interface ToastState {

}


export default class Toast extends React.Component<ToastProps, ToastState> {
  public context
  constructor(props, context) {
    super(props)
    this.context = context
  }

  render() {
    const { messages, error } = this.props
    return <div className="toast" >
      <Transition>
        {
          messages.toJS().map((value, index) => {
            return <Alert status="info" key={ value } isVisible>
              { value }
            </Alert>
          })
        }
        {
          error.toJS().map((v, i) => {
            return <Alert status="error" key={ v } isVisible>
              { v }
            </Alert>
          })
        }
      </Transition>
    </div>
  }
}