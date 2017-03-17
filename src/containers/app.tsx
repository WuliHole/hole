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

class App extends React.Component<IAppProps, void> {
  public hadleCommit: () => void
  constructor(props) {
    super(props);

  }

  @requireAuth
  loginIn() {
  }

  shouldHideNavi(): boolean {
    // Match verifying page
    return /\/verify/.test(this.props.location.pathname)
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
    const firstName = session.getIn(['user', 'first'], '');
    const lastName = session.getIn(['user', 'last'], '');

    return (
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
            <Icon
              name={ 'xie' }
              style={ { fontSize: '14px' } }
              onClick={ this.loginIn.bind(this) }>
              写文章
            </Icon>
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

          <NavigatorItem isVisible={ isLoggedIn } mr>
            <Avatar size={ 30 }
              src={ isLoggedIn && session.get('user').get('avatar') }
            />
          </NavigatorItem>

          <NavigatorItem isVisible={ isLoggedIn }>
            <Button onClick={ logout } className="bg-red white">
              Logout
            </Button>
          </NavigatorItem>

        </Navigator>

        <Content isVisible={ true }>
          { children }
        </Content>
      </div >
    );
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
