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

  onClick = (e) => {
    const editorState: EditorState = this.props.store
      .getItem('getEditorState')()

    if (editorState.getCurrentContent().getPlainText().length > 0
      && this.props.onClick) {
      setTimeout(() => this.props.onClick(e, this.props.store), )
    }
  }

  render() {
    const {
      text,
      theme
    } = this.props

    return <div>
      {
        <button
          onClick={ __TEST__ ? this.props.onClick : this.onClick }
          className={ ` ${theme ? theme : ''} btn` }
          style={ {
            color: this.state.isVisible ? '' : '#000000'
          } }
          >
          { text ? text : 'Not Rounded' }
        </button>
      }
    </div>
  }
}


