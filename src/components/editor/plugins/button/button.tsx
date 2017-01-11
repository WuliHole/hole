import React = require('react')

export interface Ioptions {
  onClick?: (...args) => any
  text?: string
  theme?: string
  isVisible?: boolean
}


export default class extends React.Component<{ store } & Ioptions, any> {
  state = {
    isVisible: this.props.isVisible || false,
  }

  componentWillMount() {
    this.props.store.subscribeToItem('isVisible', this.onVisibilityChanged);
  }

  componentWillUnmount() {
    this.props.store.unsubscribeFromItem('isVisible', this.onVisibilityChanged);
  }

  onVisibilityChanged = (isVisible) => {
    // need to wait a tick for window.getSelection() to be accurate
    setTimeout(() => {
      this.setState({
        isVisible
      })
    }, 0)
  }


  render() {
    const {
      text,
      theme
    } = this.props

    return <div>
      { this.state.isVisible &&
        <button
          onClick={ this.props.onClick }
          className={ ` ${theme ? theme : ''} btn` }
          >
          { text ? text : 'Not Rounded' }
        </button>
      }
    </div>
  }
}


