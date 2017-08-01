import * as React from 'react'
import { bindActionCreators } from 'redux'
import * as classnames from 'classnames'
import { Link } from 'react-router'
import Moment = require('moment')
import Transition from '../../components/transition'
import Container from '../../components/container'
import { EditorState } from 'draft-js'
import Editor from '../../components/editor'
import { Serlizer } from '../../components/editor/utils/serializer'
import CommonAppBar from '../../widgets/commonAppBar'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import Settings from 'material-ui/svg-icons/action/settings';
import Delete from 'material-ui/svg-icons/action/delete';
import CircularProgress from 'material-ui/CircularProgress'
import Divider from 'material-ui/Divider'
import Chip from 'material-ui/Chip'
import Goback from '../../widgets/goback'
import ProfileForm from '../../widgets/profile'
import RaisedButton from 'material-ui/RaisedButton'
import { getProfile } from '../../actions/profile'
import { getUserPosts, create } from '../../actions/posts'
import { Map, List, OrderedMap } from 'immutable'
import { update } from '../../actions/session'
import { isRejectedAction } from '../../actions/utils'
import { GET_PROFILE_SUCCESS } from '../../constants/profile'
import { unique } from '../../utils/arrayUtils'
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import { primary1Color, secondaryColor } from '../../store/theme'
import isLogin from '../../store/isLogin'
import { groupPostsByAuthorId } from '../../redux-selector/posts'
import './profile.less'
const connect = require('react-redux').connect

type store = {
  meta: Map<string, any>
  isLoading: boolean
  hasError: boolean
  errMsg: string
}
interface ProfileProps extends React.Props<any> {
  session: any;
  history
  location
  form
  profile: Map<store, any>
  getProfile: (uid: string | number | any) => Promise<any>
  getUserPosts: (uid: string | number | any) => Promise<any>
  updateProfile: (formName: string, sync?: boolean) => Promise<any>
  groupedPostsByAuthorId: GroupedPosts
  params
  createPost: () => Promise<any>
}

type GroupedPosts = OrderedMap<number, Map<string, Map<keyof Post<any>, any>>>

function mapStateToProps(state) {
  return {
    profile: state.profile,
    groupedPostsByAuthorId: groupPostsByAuthorId(state),
    session: state.session
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getProfile: bindActionCreators(getProfile, dispatch),
    getUserPosts: bindActionCreators(getUserPosts, dispatch),
    createPost: bindActionCreators(create, dispatch),
    updateProfile: (formName, sync = false) => {
      return dispatch(update(formName)).then(state => {
        if (!isRejectedAction(state)) {
          dispatch({
            type: GET_PROFILE_SUCCESS,
            payload: state.payload,
            meta: state.meta
          })
        }
      })
    }
  }
}

interface ProfileState {
  selectedItem?: string
}

class Profile extends React.Component<ProfileProps, ProfileState> {
  state = {
    selectedItem: ''
  }
  get userId() {
    let uid
    if (this.props.params.uid) {
      uid = this.props.params.uid
    }
    if (this.props.session.getIn(['user', 'id'])) {
      uid = this.props.session.getIn(['user', 'id']).toString()
    }
    return uid
  }

  get profile(): Map<keyof User, any> {
    return this.props.profile.getIn(['meta', this.userId])
  }

  get posts(): Post<any>[] {
    const id = parseInt(this.userId, 10)
    const posts = this.props.groupedPostsByAuthorId.get(id)
    return posts
      ? posts
        .toSet()
        .sortBy(p => new Date(p.get('createdAt')))
        .reverse()
        .toJS()
      : []
  }

  // load profile if didn't  find the profile of target user .
  componentDidMount() {
    if (!this.profile) {
      this.props.getProfile(this.userId)
    }

    if (!this.posts || this.posts.length < 10) {
      this.props.getUserPosts(this.userId)
    }

  }

  onSave = (formName: string) => {
    let myUserId = this.props.session.getIn(['user,id'])
    const stateSync = this.profile.get('id') === myUserId
    return this.props.updateProfile(formName, stateSync)
  }

  onCreate = () => {
    this.props.createPost()
      .then((res) => {
        if (isRejectedAction(res)) {
          return alert(res.payload)
        }
        this.props.history.push('/createNew')
      })
      .catch(() => alert('....'))
  }

  render() {


    const profileForm = <ProfileForm
      profile={ this.profile }
      onSave={ this.onSave }
    />

    return (
      <Transition >
        <CommonAppBar history={ this.props.history } />
        <div style={ { marginTop: 50 } }>
          { this.leftPart() }
          { this.rightPart() }
        </div>

      </Transition>
    )
  }

  leftPart() {
    const style = {
      paper: {
        display: 'inline-block',
        float: 'left',
        height: '100%',
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
    };
    const l = []
    l.push(['浏览', <RemoveRedEye />])
    l.push(['设置', <Settings />])
    return (
      <div style={ { height: '100vh', position: 'fixed' } }>
        <Paper style={ style.paper }>

          <Menu selectedMenuItemStyle={ style.selectedMenuItem } >
            <div className="flex items-center m3">
              <RaisedButton
                buttonStyle={ style.raisedBtn.button }
                onClick={ this.onCreate }
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
  }
  rightPart() {
    const loader = <CircularProgress
      style={ { marginLeft: '45%', marginTop: '5rem' } }
    />
    return <Container size={ 5 } center backgroundTheme="background-color-gray" style={ { marginTop: '14px', marginLeft: 200 } }>
      {/*profile container*/ }
      <Container size={ 4 } center className="profile">
        {
          this.profile
            ? <ProfileForm
              profile={ this.profile }
              onSave={ this.onSave }
            />
            : loader
        }
      </Container>

      {/*posts container*/ }
      <Container size={ 4 } center className="profile-posts mt2">

        {
          !this.posts
            ? loader
            : unique(this.posts, p => p.id).map(p => {
              const contentState = Serlizer.deserialize(p.content)
              return <div key={ p.id } className="mt2 mb2">
                <Link to={ `/post/${p.title}/${p.id}` }>
                  <CardHeader
                    title={ p.title }
                    titleStyle={ { fontSize: '2rem' } }
                    subtitle={ Moment(new Date(p.createdAt))
                      .locale('zh-cn')
                      .format('L') }
                    style={ { padding: '16px 0' } }
                    subtitleStyle={
                      { fontSize: '0.9rem', width: '90%', margin: '1rem 0' }
                    }
                  >
                  </CardHeader>
                </Link>
                <Editor
                  editorState={
                    EditorState.createWithContent(contentState)
                  }
                  readOnly
                />
                <Divider />
              </div>
            })
        }
      </Container>
    </Container>
  }
}




export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)



