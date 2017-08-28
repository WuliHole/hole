import * as React from 'react'
import { HistoryBase } from 'react-router'
import CommonAppBar from '../../widgets/commonAppBar'
import Transition from '../../components/transition'
import { connect } from 'react-redux'
import { secondaryColor } from '../../store/theme'
import { Paper, Menu, RaisedButton, MenuItem } from 'material-ui'
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye'
import Settings from 'material-ui/svg-icons/action/settings'
import Draft from 'material-ui/svg-icons/content/archive'
import { bindActionCreators } from 'redux'
import { getDraft, create, edit } from '../../actions/posts'
import { isRejectedAction } from '../../actions/utils'
import './dashboard.less'
import Container from '../../components/container';

function mapStateToProps(state) {
  return {
    profile: state.profile,
    posts: state.posts,
    session: state.session
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onCreate: bindActionCreators(create, dispatch),
    edit: bindActionCreators(edit, dispatch),
    dispatch
  }
}

interface ViewProps {
  history: HistoryBase
  viewContent: JSX.Element
  posts
  session
  profile
  location: Location
  dispatch
  edit: typeof edit
  onCreate: () => Promise<any>
}

interface ViewState {
  selectedItem: string
}

@connect(mapStateToProps, mapDispatchToProps)
export default class DashBoardView extends React.PureComponent<ViewProps, ViewState> {
  static sideBarMenu = [
    { text: '浏览', icon: <RemoveRedEye />, path: '/dashboard/recent-post?public=true' },
    { text: '草稿', icon: <Draft />, path: '/dashboard/recent-post?public=false' },
    { text: '设置', icon: <Settings />, path: '/dashboard/setting' }
  ]

  componentWillMount() {
    const path = this.props.location.pathname + this.props.location.search
    const activeItem = DashBoardView.sideBarMenu.find(i => path === i.path)
    if (activeItem) {
      const selectedItem = activeItem.text
      this.setState({ selectedItem })
    }
  }
  state = {
    selectedItem: null
  }

  createPost = () => {
    this.props.onCreate()
      .then((res) => {
        if (isRejectedAction(res)) {
          return alert(res.payload)
        }
        this.props.history.push(`/post/${res.payload.id}/edit`)
      })
      .catch(() => alert('未知的错误'))
  }

  edit = (p: Post<any>) => {
    this.props.edit(p.id)
  }

  render() {
    const { history, viewContent } = this.props

    const sideBar = (
      <div style={ { height: '100vh', position: 'fixed', ...style.paper } } className="sidebar">
        <Paper style={ style.paper }>
          <div className="flex items-center m3">
            { this.renderCreatePostButton() }
          </div>
          { DashBoardView.sideBarMenu.map((i, index) => {
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

  renderCreatePostButton = (text = '新建文章') => {
    return <RaisedButton
      buttonStyle={ style.raisedBtn.button }
      onClick={ this.createPost }
      style={ style.raisedBtn.container }
      secondary >
      { text }
    </RaisedButton >
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
    const renderCreatePostButton = this.renderCreatePostButton
    if (viewContent) {
      const props = {
        renderAppBar: false,
        session,
        posts: posts.get('meta'),
        profile: profile.get('meta'),
        history,
        dispatch,
        edit: this.edit,
        renderCreatePostButton
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