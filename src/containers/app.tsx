import * as React from 'react';
const connect = require('react-redux').connect;
const Link = require('react-router').Link;

import { loginUser, logoutUser } from '../actions/session';
import { openModal, closeModal } from '../actions/modal';
import Button from '../components/button';
import Content from '../components/content';
import LoginModal from '../components/login/login-modal';
import Logo from '../components/logo';
import Navigator from '../components/navigator';
import NavigatorItem from '../components/navigator-item';
import {requireAuth} from '../middleware/requireAuth';
interface IAppProps extends React.Props<any> {
  session: any;
  login: () => void;
  logout: () => void;
  modal: any;
  openLoginModal: () => void;
  closeLoginModal: () => void;
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
  handleCommit() {
    alert(2222222222)
  }
  render() {
    const { children, session, login, logout, modal, closeLoginModal} = this.props;
    const token = session.get('token', false);
    const isLoggedIn = token && token !== null && typeof token !== 'undefined';
    const firstName = session.getIn(['user', 'first'], '');
    const lastName = session.getIn(['user', 'last'], '');

    return (
      <div>
        <LoginModal
          onSubmit={ login }
          onClose={closeLoginModal}
          isPending={ session.get('isLoading', false) }
          hasError={ session.get('hasError', false) }
          isVisible={ modal.get('opened', false) } />
        <Navigator testid="navigator">

          <NavigatorItem mr>
            <Logo />
          </NavigatorItem>

          <NavigatorItem mr>
            <Link to="/article">Article</Link>
          </NavigatorItem>

          <NavigatorItem isVisible={ isLoggedIn } mr>
            <Link to="/">Counter</Link>
          </NavigatorItem>

          <NavigatorItem isVisible={!isLoggedIn }mr>
            <Button onClick={this.handleCommit.bind(this) }>
              Commit
            </Button>
          </NavigatorItem>

          <NavigatorItem isVisible={ isLoggedIn }>
            <Link to="/about">About Us</Link>
          </NavigatorItem>
          <div className="flex flex-auto"></div>
          <NavigatorItem isVisible={ isLoggedIn } mr>
            <div
              data-testid="user-profile"
              className="h3">
              { `${firstName} ${lastName}` }
            </div>
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
      </div>
    );
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
