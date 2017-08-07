import * as React from 'react';
import { PropTypes, } from 'react'
const connect = require('react-redux').connect;
import { bindActionCreators } from 'redux'
import { Link, History } from 'react-router'
import { loginUser, logoutUser, signUpUser } from '../actions/session';
import { openModal, closeModal } from '../actions/modal';
import { create } from '../actions/posts';
import Content from '../components/content';
import LoginModal from '../components/login/login-modal';

import { isRejectedAction } from '../actions/utils'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import * as injectTapEven from 'react-tap-event-plugin'
import { muiTheme } from '../store/theme'
import Toast from '../components/toast'
import { message, error, removeFirst } from '../actions/toast'
import { List } from 'immutable'
injectTapEven()

interface IAppProps extends React.Props<any> {
  session: any;
  login: () => void;
  signup: () => void;
  modal: any;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  createPost: () => Promise<any>
  location: Location
  history: History
  posts
  toast
  displayMessage: typeof message
  displayError: typeof error
  shiftToast: typeof removeFirst
};


interface AppState {
}

function mapStateToProps(state) {
  return {
    session: state.session,
    router: state.router,
    modal: state.modal,
    posts: state.posts,
    toast: state.toast
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: () => dispatch(loginUser()),
    signup: () => dispatch(signUpUser()),
    logout: () => dispatch(logoutUser()),
    openLoginModal: () => dispatch(openModal()),
    closeLoginModal: () => dispatch(closeModal()),
    createPost: () => dispatch(create()),
    displayMessage: bindActionCreators(message, dispatch),
    displayError: bindActionCreators(error, dispatch),
    shiftToast: bindActionCreators(removeFirst, dispatch)
  };
}



class App extends React.Component<IAppProps, AppState> {
  static childContextTypes = {
    displayError: PropTypes.func,
    displayMessage: PropTypes.func,
    shiftToast: PropTypes.func
  }

  getChildContext() {
    const { displayError, displayMessage } = this
    return {
      displayError,
      displayMessage,
    }
  }

  displayMessage: DisplayMessage = (message: string, duration = 3000) => {
    this.props.displayMessage(message)
    setTimeout(() => this.props.shiftToast('message'), duration)
  }

  displayError: DisplayError = (error: string, duration = 3000) => {
    this.props.displayError(error)
    setTimeout(() => this.props.shiftToast('error'), duration)
  }

  render() {
    const {
      children,
      session,
      login,
      signup,
      modal,
      closeLoginModal,
      toast
    } = this.props;
    const messages = toast.get('messages')
    const errors = toast.get('errors')

    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
        <div>
          <Toast messages={ messages } error={ errors } />
          {
            modal.get('opened') &&
            <LoginModal
              login={ login }
              signup={ signup }
              onClose={ closeLoginModal }
              isPending={ session.get('isLoading', false) }
              hasError={ session.get('hasError', false) }
              isVisible={ modal.get('opened', false) } />
          }
          <Content isVisible={ true }>
            { children }
          </Content>
        </div >
      </MuiThemeProvider>
    );
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
