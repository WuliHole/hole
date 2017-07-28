import * as React from 'react';
import { PropTypes } from 'react'
const connect = require('react-redux').connect;
import { Link, History } from 'react-router'
import { loginUser, logoutUser, signUpUser } from '../actions/session';
import { openModal, closeModal } from '../actions/modal';
import { create } from '../actions/posts';
import Button from '../components/button';
import Content from '../components/content';
import LoginModal from '../components/login/login-modal';
import Logo from '../components/logo';
import Navigator from '../components/navigator';
import NavigatorItem from '../components/navigator-item';
import { requireAuth } from '../middleware/requireAuth';
import Avatar from '../components/avatar'
import Icon from '../components/icon'
import { isRejectedAction } from '../actions/utils'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Popover from 'material-ui/Popover/Popover'
import { List, ListItem } from 'material-ui/List'
import * as injectTapEven from 'react-tap-event-plugin'
import IconAdd from 'material-ui/svg-icons/content/add'
import IconButton from 'material-ui/IconButton'
import Snackbar from 'material-ui/Snackbar';
import { muiTheme } from '../store/theme'
import Profile from '../routers/profile/profile.page'
import isLogin from '../store/isLogin'
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
};

interface AppState {
}
function mapStateToProps(state) {
  return {
    session: state.session,
    router: state.router,
    modal: state.modal,
    posts: state.posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: () => dispatch(loginUser()),
    signup: () => dispatch(signUpUser()),
    logout: () => dispatch(logoutUser()),
    openLoginModal: () => dispatch(openModal()),
    closeLoginModal: () => dispatch(closeModal()),
    createPost: () => dispatch(create())
  };
}


class App extends React.Component<IAppProps, AppState> {
  render() {
    const {
      children,
      session,
      login,
      signup,
      modal,
      closeLoginModal
    } = this.props;
    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
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
