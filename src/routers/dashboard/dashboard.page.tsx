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

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    onCreate: bindActionCreators(create, dispatch)
  }
}

interface ViewProps {
  history: HistoryBase,
  viewContent: JSX.Element
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
    const l = []
    l.push(['浏览', <RemoveRedEye />])
    l.push(['设置', <Settings />])
    const sideBar = (
      <div style={ { height: '100vh', position: 'fixed', ...style.paper } } className="sidebar">
        <Paper style={ style.paper }>

          <Menu selectedMenuItemStyle={ style.selectedMenuItem } >
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
              const text = i[0]
              const icon = i[1]
              return < MenuItem
                key={ text }
                onClick={ e => this.setState({ selectedItem: text }) }
                className={ text === this.state.selectedItem ? 'profile-item-active' : '' }
                primaryText={ text }
                style={ style.item }
                leftIcon={ icon }
              />
            })
            }
          </Menu>
        </Paper>
      </div>
    )
    return <Transition>
      <div className="dashboard">
        <CommonAppBar history={ history } />
        { sideBar }
        { viewContent }
      </div>
    </Transition>
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