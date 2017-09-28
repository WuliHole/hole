import * as React from 'react'
import { PropTypes, } from 'react'
const connect = require('react-redux').connect
import { bindActionCreators } from 'redux'
import { Link, HistoryBase } from 'react-router'
import Content from '../components/content'
import LoginModal from '../components/login/login-modal'

import { isRejectedAction } from '../actions/utils'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as injectTapEven from 'react-tap-event-plugin'
import { muiTheme } from '../store/theme'
import Toast from '../components/toast'
import { openModal, closeModal } from '../actions/modal'
import { create } from '../actions/posts'
import { loginUser, logoutUser, signUpUser, accessTokenRefresh } from '../actions/session'
import { message, error, removeFirst } from '../actions/toast'
import { initialLoadNotifications } from 'app/actions/notification'
import decode = require('jwt-decode')
import { List } from 'immutable'
injectTapEven()

interface IAppProps extends React.Props<any> {
  session: any
  login: () => Promise<any>
  signup: () => Promise<any>
  logout: () => Promise<any>
  refreshAcessToken: (tok: string) => Promise<any>
  modal: any
  openLoginModal: () => void
  closeLoginModal: () => void
  createPost: () => Promise<any>
  location: Location
  history: HistoryBase
  posts
  toast
  displayMessage: typeof message
  displayError: typeof error
  shiftToast: typeof removeFirst
  loadNotifications: typeof initialLoadNotifications
}


interface AppState {
}

function mapStateToProps(state) {
  return {
    session: state.session,
    router: state.router,
    modal: state.modal,
    posts: state.posts,
    toast: state.toast
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: () => dispatch(loginUser()),
    signup: () => dispatch(signUpUser()),
    logout: () => dispatch(logoutUser()),
    refreshAcessToken: bindActionCreators(accessTokenRefresh, dispatch),
    openLoginModal: () => dispatch(openModal()),
    closeLoginModal: () => dispatch(closeModal()),
    createPost: () => dispatch(create()),
    displayMessage: bindActionCreators(message, dispatch),
    displayError: bindActionCreators(error, dispatch),
    shiftToast: bindActionCreators(removeFirst, dispatch),
    loadNotifications: bindActionCreators(initialLoadNotifications, dispatch)
  }
}


type Second = number
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

  isExpried(token: string, max: Second): boolean {
    try {
      const decodedTok: any = decode(token)

      // ms
      const signAt = decodedTok.iat
      if (!signAt) {
        return true
      }

      // s
      const diff = (Date.now() - signAt * 1000) / 1000
      if (diff >= max) {
        return true
      }

      return false
    } catch (e) {
      return true
    }
  }

  componentWillMount() {
    const uid = this.props.session.getIn(['user', 'id'])
    const token = this.props.session.get('feedToken')
    const refreshToken = this.props.session.get('refreshToken')
    const accessToken = this.props.session.get('token')

    // lost token or bad refresh token
    if (uid && (!refreshToken || typeof refreshToken !== 'string')) {
      return this.logout()
    }

    // 6days
    const refreshTokMaxAge = 3600 * 24 * 6
    if (refreshToken && this.isExpried(refreshToken, refreshTokMaxAge)) {
      return this.logout()
    }

    // 1.5h
    const accessTokMaxAge = 3600 * 1.5
    if (accessToken && this.isExpried(accessToken, accessTokMaxAge)) {
      return this.props.refreshAcessToken(refreshToken)
        .then((res) => {

          if (!isRejectedAction(res) && res.payload.token) {
            // refresh access tok success
            window.location.reload()
          } else {
            // unkonw error , just log out
            this.logout()
          }
        })
    }

    if (uid && token) {
      this.props.loadNotifications(uid, token)
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

  logout = () => {
    return this.props.logout().then(() => { this.props.history.push('/') })
  }

  login = () => {
    this.props.login()
      .then(res => {
        if (isRejectedAction(res)) {
          this.displayError(res.payload.errMsg)
        } else {
          this.props.closeLoginModal()
        }
      })
  }

  signup = () => {
    this.props.signup()
      .then(res => {
        if (isRejectedAction(res)) {
          this.displayError(res.payload.errMsg)
        }
      })
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
    } = this.props
    const messages = toast.get('messages')
    const errors = toast.get('errors')

    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
        <div>
          <Toast messages={ messages } error={ errors } />
          {
            modal.get('opened') &&
            <LoginModal
              login={ this.login }
              signup={ this.signup }
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
    )
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
