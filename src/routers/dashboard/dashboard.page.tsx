import * as React from 'react'
import { HistoryBase } from 'react-router'
import CommonAppBar from '../../widgets/commonAppBar'
import Transition from '../../components/transition'
import { connect } from 'react-redux'
import { secondaryColor } from '../../store/theme'
import { Paper, Menu, RaisedButton, MenuItem } from 'material-ui'
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye'
import Settings from 'material-ui/svg-icons/action/settings'
import { bindActionCreators } from 'redux'
import { getUserPosts, create } from '../../actions/posts'
import { isRejectedAction } from '../../actions/utils'
import './dashboard.less'
import Container from '../../components/container';

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    onCreate: bindActionCreators(create, dispatch),
    dispatch
  }
}

interface ViewProps {
  history: HistoryBase
  viewContent: JSX.Element
  posts
  session
  profile
  dispatch
  onCreate: () => Promise<any>
}

interface ViewState {
  selectedItem: string
}

@connect(mapStateToProps, mapDispatchToProps)
export default class DashBoardView extends React.PureComponent<ViewProps, ViewState> {
  state = {
    selectedItem: null
  }

  createPost = () => {
    this.props.onCreate()
      .then((res) => {
        if (isRejectedAction(res)) {
          return alert(res.payload)
        }
        this.props.history.push('/createNew')
      })
      .catch(() => alert('....'))
  }

  render() {
    const { history, viewContent } = this.props
    const l = [
      { text: '浏览', icon: <RemoveRedEye />, path: '/dashboard/recent-post' },
      { text: '设置', icon: <Settings />, path: '/dashboard/setting' }
    ]
    const sideBar = (
      <div style={ { height: '100vh', position: 'fixed', ...style.paper } } className="sidebar">
        <Paper style={ style.paper }>
          <div className="flex items-center m3">
            <RaisedButton
              buttonStyle={ style.raisedBtn.button }
              onClick={ this.createPost }
              style={ style.raisedBtn.container }
              secondary >
              新建文章
              </RaisedButton >
          </div>
          { l.map((i, index) => {
            const { text, icon, path } = i
            return < MenuItem
              key={ text }
              onClick={ e => {
                this.setState({ selectedItem: text })
                if (path) {
                  this.props.history.push(path)
                }
              } }
              className={ text === this.state.selectedItem ? 'menu-item-active' : '' }
              primaryText={ text }
              style={ style.item }
              leftIcon={ icon }
            />
          })
          }
        </Paper>
      </div>
    )

    return <Transition>
      <div className="dashboard">
        <CommonAppBar history={ history } />
        { sideBar }
        <div className="content-container">
          { this.props.viewContent
            &&
            <Container center size={ 4 } style={ { padding: '3rem', marginTop: '4rem' } }>
              { this.renderContent() }
            </Container>
          }
        </div>
      </div>
    </Transition>
  }

  renderContent() {
    const {
       viewContent,
      session,
      history,
      profile,
      posts,
      dispatch
      } = this.props
    if (viewContent) {
      const props = {
        renderAppBar: false,
        session,
        posts: posts.get('meta'),
        profile: profile.get('meta'),
        history,
        dispatch
      }
      const newViewContent = React.cloneElement(viewContent, props)
      return newViewContent
    }
  }
}

const style = {
  paper: {
    display: 'inline-block',
    float: 'left',
    height: '100%',
    boxShadow: 'none',
    top: 0
  },
  item: {
    color: '#88959E',
    minWidth: 200,
    paddingLeft: 20,
    fontSize: 14,
  },
  selectedMenuItem: {
    color: '#2592F6'
  },
  raisedBtn: {
    container: {
      background: secondaryColor,
      margin: '0 auto',
      width: 150,

    },
    button: {
      color: '#fff',
    }
  }
}