import * as React from 'react';
const connect = require('react-redux').connect;
import { Link } from 'react-router'
import { loginUser, logoutUser, signUpUser } from '../actions/session';
import { openModal, closeModal } from '../actions/modal';
import Button from '../components/button';
import Content from '../components/content';
import LoginModal from '../components/login/login-modal';
import Logo from '../components/logo';
import Navigator from '../components/navigator';
import NavigatorItem from '../components/navigator-item';
import { requireAuth } from '../middleware/requireAuth';
import Avatar from '../components/avatar'
import Icon from '../components/icon'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Popover from 'material-ui/Popover/Popover'
import Menu from 'material-ui/Menu/'
import MenuItem from 'material-ui/MenuItem'
import { List, ListItem } from 'material-ui/List'
import * as injectTapEven from 'react-tap-event-plugin'
import IconAdd from 'material-ui/svg-icons/content/add'
import IconButton from 'material-ui/IconButton'

injectTapEven()

interface IAppProps extends React.Props<any> {
  session: any;
  login: () => void;
  logout: () => void;
  signup: () => void;
  modal: any;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  location: Location
};

interface AppState {
  anchorEl: any
  showPopMenu: boolean
}
function mapStateToProps(state) {
  return {
    session: state.session,
    router: state.router,
    modal: state.modal,

  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: () => dispatch(loginUser()),
    signup: () => dispatch(signUpUser()),
    logout: () => dispatch(logoutUser()),
    openLoginModal: () => dispatch(openModal()),
    closeLoginModal: () => dispatch(closeModal()),
  };
}

class App extends React.Component<IAppProps, AppState> {
  public hadleCommit: () => void
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      showPopMenu: false
    }
  }

  @requireAuth
  loginIn() {
  }

  shouldHideNavi(): boolean {
    // Match verifying page
    return /\/verify/.test(this.props.location.pathname)
  }

  handleOnClick = (ev) => {
    this.setState({
      anchorEl: ev.target,
      showPopMenu: true
    })
  }

  handleRequestClose = () => {
    this.setState({ showPopMenu: false })
  }

  render() {
    const {
      children,
      session,
      login,
      logout,
      signup,
      modal,
      closeLoginModal
    } = this.props;
    const token = session.get('token', false);
    const isLoggedIn = token && token !== null && typeof token !== 'undefined';
    const nickName = session.getIn(['user', 'nickName'], '');

    const avatar = <Avatar size={ 30 }
      src={ isLoggedIn && session.get('user').get('avatar') }
    />

    return (
      <MuiThemeProvider>
        <div>
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
          <Navigator testid="navigator" isVisible={ !this.shouldHideNavi() }>

            <NavigatorItem mr>
              <Link to="/">
                <Logo />
              </Link>
            </NavigatorItem>


            <div className="flex flex-auto"></div>

            <NavigatorItem mr>
              <Link to="/article">Artciles</Link>
            </NavigatorItem>

            <NavigatorItem mr>
              <IconButton>
                <IconAdd />
              </IconButton>
            </NavigatorItem>

            <NavigatorItem isVisible={ !isLoggedIn } mr>
              <Button
                style={ {
                  background: 'rgba(0,0,0,0)',
                  fontSize: '14px',
                  color: '#449bf7',
                  fontWeight: 300
                } }
                onClick={ this.loginIn.bind(this) }>
                登录/注册
            </Button>
            </NavigatorItem>

            <NavigatorItem isVisible={ isLoggedIn } >
              <div onClick={ this.handleOnClick }
                style={ { cursor: 'pointer' } }
              >
                { avatar }
              </div>
              <Popover
                open={ this.state.showPopMenu }
                anchorEl={ this.state.anchorEl }
                targetOrigin={ { horizontal: 'right', vertical: 'top' } }
                anchorOrigin={ { horizontal: 'right', vertical: 'bottom' } }
                onRequestClose={ this.handleRequestClose }
              >
                <List style={ { minWidth: '150px' } }>
                  <ListItem onClick={ logout } primaryText="退出"
                    className="center"
                    style={ { fontSize: '14px' } }>
                  </ListItem>
                </List>
              </Popover>
            </NavigatorItem>

          </Navigator>

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
