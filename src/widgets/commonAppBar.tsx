import React = require('react')
import { bindActionCreators } from 'redux'
import { PropTypes } from 'react'
import * as classnames from 'classnames'
import AppBar from 'material-ui/AppBar'
import Logo from '../components/logo'
import Avatar from '../components/avatar'
import Popover from 'material-ui/Popover/Popover'
import { Link, HistoryBase } from 'react-router'
import { List, ListItem } from 'material-ui/List'
import Button from '../components/button'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/session'
import { openModal } from '../actions/modal'
import isLogin from '../store/isLogin'
import './commonAppBar.less'
import { isRejectedAction } from '../actions/utils'
import Notification from 'app/components/notification/index'
import { clearnUnreadNotification } from '../actions/'

interface CommonAppBarProps {
  logout?: any
  user?: User
  history: HistoryBase
  openLoginModal?: any
  fixed?: boolean
  notification?
  style?: React.CSSProperties
  clearnUnreadNotification?: typeof clearnUnreadNotification
}

interface CommonAppBarState {
  showPopMenu: boolean
  anchorEl?: HTMLElement
}


function mapStateToProps(store) {
  return {
    user: store.session.toJS().user,
    notification: store.notification
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logoutUser()),
    openLoginModal: () => dispatch(openModal()),
    clearnUnreadNotification: bindActionCreators(clearnUnreadNotification, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
class CommonAppBar extends React.Component<CommonAppBarProps, CommonAppBarState> {
  static contextType = {
    displayError: PropTypes.func
  }

  state = {
    showPopMenu: false,
    anchorEl: null
  }

  showPopMenu = () => {
    this.setState({ showPopMenu: true })
  }

  closePopMenu = () => {
    this.setState({ showPopMenu: false })
  }

  navigateToMyProfile = () => {
    this.setState({ showPopMenu: false }, () => {
      const uid = this.props.user && this.props.user.id
      this.props.history.push(`/profile/${uid}`)
    })
  }

  ref = el => this.setState({ anchorEl: el })

  logout = () => {
    this.props.logout()
      .then(res => {
        if (!isRejectedAction(res)) {
          this.props.history.push('/logged-out')
        } else {
          const error: DisplayError = this.context.displayError
          error(res.payload.errMsg)
        }
      })
  }

  elementRight() {
    if (isLogin()) {
      const avatar = <Avatar size={ 30 }
        onClick={ this.showPopMenu }
        src={ this.props.user.avatar }
      />

      return <div className="app-bar-right-item" ref={ this.ref }>
        <Notification
          unread={ this.props.notification.unread }
          notifications={ this.props.notification.data }
          clearUnread={ this.props.clearnUnreadNotification }
          isLoading={ this.props.notification.fetching }
        />
        { avatar }
        { this.state.showPopMenu &&
          <Popover
            open={ this.state.showPopMenu }
            anchorEl={ this.state.anchorEl }
            targetOrigin={ { horizontal: 'right', vertical: 'top' } }
            anchorOrigin={ { horizontal: 'right', vertical: 'bottom' } }
            autoCloseWhenOffScreen
            onRequestClose={ this.closePopMenu }
          >
            <List style={ { minWidth: '150px' } }>
              <ListItem
                onClick={ this.navigateToMyProfile }
                primaryText="我的主页"
                className="center"
                style={ { fontSize: '14px' } }>
              </ListItem>

              <ListItem onClick={ this.logout } primaryText="退出"
                className="center"
                style={ { fontSize: '14px' } }>
              </ListItem>
            </List>
          </Popover>
        }
      </div>
    }

    return <Button
      style={ {
        background: 'rgba(0,0,0,0)',
        fontSize: '14px',
        color: '#449bf7',
        fontWeight: 300,
        padding: 15
      } }
      onClick={ this.props.openLoginModal }>
      登录/注册
            </Button>
  }

  render() {
    const { fixed = true, style = {} } = this.props
    const rightElement = <div className="app-bar-right-element">
      { this.elementRight() }
    </div>
    const cls = classnames({ fixed })
    const containerStyle = fixed ? { top: 0, width: '100%', zIndex: 999 } : {}
    return <div className={ cls } style={ containerStyle }>
      <AppBar
        iconElementLeft={ <Link to="/" className="text-decoration-none"><Logo /></Link> }
        style={ { boxShadow: '0', ...style } }
        iconElementRight={
          rightElement
        }
      />
    </div>
  }
}

export default CommonAppBar