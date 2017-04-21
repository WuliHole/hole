import * as React from 'react';
import { PropTypes } from 'react'
const connect = require('react-redux').connect;
import { Link, History } from 'react-router'
import { loginUser, logoutUser, signUpUser } from '../actions/session';
import { openModal, closeModal } from '../actions/modal';
import { create } from '../actions/article';
import Button from '../components/button';
import Content from '../components/content';
import LoginModal from '../components/login/login-modal';
import Logo from '../components/logo';
import Navigator from '../components/navigator';
import NavigatorItem from '../components/navigator-item';
import { requireAuth } from '../middleware/requireAuth';
import Avatar from '../components/avatar'
import Icon from '../components/icon'
import { isRejectAction } from '../actions/utils'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Popover from 'material-ui/Popover/Popover'
import Menu from 'material-ui/Menu/'
import MenuItem from 'material-ui/MenuItem'
import { List, ListItem } from 'material-ui/List'
import * as injectTapEven from 'react-tap-event-plugin'
import IconAdd from 'material-ui/svg-icons/content/add'
import IconButton from 'material-ui/IconButton'
import Snackbar from 'material-ui/Snackbar';
import getMuiTheme from 'material-ui/styles/getMuiTheme'


injectTapEven()

interface IAppProps extends React.Props<any> {
  session: any;
  login: () => void;
  logout: () => void;
  signup: () => void;
  modal: any;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  createPost: () => Promise<any>
  location: Location
  history: History
  article
};

interface AppState {
  anchorEl?: any
  showPopMenu?: boolean
}
function mapStateToProps(state) {
  return {
    session: state.session,
    router: state.router,
    modal: state.modal,
    article: state.article
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

const muiTheme = getMuiTheme({

  fontFamily: 'Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, \
   Microsoft YaHei, Noto Sans CJK SC, WenQuanYi Micro Hei, Arial, sans-serif',

})
class App extends React.Component<IAppProps, AppState> {
  public hadleCommit: () => void

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      showPopMenu: false,
    }
  }

  @requireAuth
  loginIn() {
  }

  shouldHideNavi(): boolean {
    const path = this.props.location.pathname
    // Match verifying page
    return /\/verify/.test(path)
      // Match createNew
      || /createNew/.test(path)
      || /profile/.test(path)
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

  createPost = () => {
    this.props.createPost()
      .then(
      s => !isRejectAction(s) && this.context.router.push('createNew')
      )
  }

  render() {
    const {
      children,
      session,
      login,
      logout,
      signup,
      modal,
      article,
      closeLoginModal
    } = this.props;
    const token = session.get('token', false);
    const isLoggedIn = token && token !== null && typeof token !== 'undefined';
    const nickName = session.getIn(['user', 'nickName'], '');

    const avatar = <Avatar size={ 30 }
      src={ isLoggedIn && session.get('user').get('avatar') }
    />
    const { hasError, errMsg = '~' } = article.toJS()


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
              <IconButton onClick={ this.createPost }><IconAdd /></IconButton>
              <Snackbar
                open={ !!hasError }
                message={ errMsg }
                autoHideDuration={ 3500 }
                action="Create new post failed"
              />
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
