import * as React from 'react'
import { bindActionCreators } from 'redux'
import * as classnames from 'classnames'
import { Link } from 'react-router'
import Moment = require('moment')
import Transition from '../../components/transition'
import Container from '../../components/container'
import { EditorState } from 'draft-js'
import CommonAppBar from '../../widgets/commonAppBar'
import { Serlizer } from '../../components/editor/utils/serializer'
import {
  CircularProgress,
  RaisedButton,
  Dialog,
  FlatButton,
  List as ListComponent, ListItem, Avatar as MAvatar
} from 'material-ui'
import Goback from '../../widgets/goback'
import { getProfile, follow, unfollow } from '../../actions/profile'
import { getFollowers, getFollowings, FollowActionParams } from 'app/actions/follow'
import { getPublished, create } from '../../actions/posts'
import { Map, List, OrderedMap } from 'immutable'
import { updateUserInfo } from '../../actions/session'
import { isRejectedAction } from '../../actions/utils'
import { GET_PROFILE_SUCCESS } from '../../constants/profile'
import { unique } from '../../utils/arrayUtils'
import isLogin from '../../store/isLogin'
import { groupPostsByAuthorId } from '../../redux-selector/posts'
import { selectFollowersForUser, selectFollowingsForUser, Followers, Followings } from 'app/redux-selector/follow'
import { requireLogin } from 'app/middleware/requireLogin'

import Avatar from 'app/components/avatar'

import './profile.less'
import PostList from '../../widgets/postList';
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

  follow: (uid: string | number | any) => Promise<any>
  unfollow: (uid: string | number | any) => Promise<any>
  followers: Followers
  followings: Followings
  getFollowers: (opts: FollowActionParams) => Promise<any>
  getFollowings: (opts: FollowActionParams) => Promise<any>
  params
  renderAppBar?: boolean
}

type GroupedPosts = OrderedMap<number, Map<string, Map<keyof Post<any>, any>>>

function mapStateToProps(state, props) {
  return {
    profile: state.profile,
    groupedPostsByAuthorId: groupPostsByAuthorId(state),
    followers: selectFollowersForUser(state, props),
    followings: selectFollowingsForUser(state, props),
    session: state.session,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getProfile: bindActionCreators(getProfile, dispatch),
    getUserPosts: bindActionCreators(getPublished, dispatch),
    follow: bindActionCreators(follow, dispatch),
    unfollow: bindActionCreators(unfollow, dispatch),
    getFollowers: bindActionCreators(getFollowers, dispatch),
    getFollowings: bindActionCreators(getFollowings, dispatch),
    updateProfile: (formName, sync = false) => {
      return dispatch(updateUserInfo(formName)).then(state => {
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


type FollowWindowDataType = 'followers' | 'followings'

interface ProfileState {
  openModal?: boolean
  dataType?: FollowWindowDataType
}


class Profile extends React.Component<ProfileProps, ProfileState> {

  constructor(props) {
    super(props)
    this.state = {
      openModal: false,
      dataType: null
    }
    this.follow = this.follow.bind(this)
    this.unfollow = this.unfollow.bind(this)
  }

  get userId() {
    if (this.props.params.uid) {
      return this.props.params.uid
    }
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
        .filter((p) => p.get('published') === true)
        .sortBy(p => new Date(p.get('createdAt')))
        .reverse()
        .toJS()
      : []
  }

  // load profile if didn't  find the profile of target user .
  componentDidMount() {
    this.loadData()
  }

  componentWillMount() {
    document.querySelector('body').classList.add('bg-white')
  }

  componentWillUnmount() {
    document.querySelector('body').classList.remove('bg-white')
  }
  // switch from one user to another
  componentDidUpdate(prevProps: ProfileProps) {
    if (this.props.params.uid !== prevProps.params.uid) {
      this.loadData()
    }
  }

  loadData() {
    this.props.getProfile(this.userId)
    this.props.getUserPosts(this.userId)
  }

  editProfile = () => {
    this.props.history.push('/dashboard/setting')
  }

  onSave = (formName: string) => {
    let myUserId = this.props.session.getIn(['user,id'])
    const stateSync = this.profile.get('id') === myUserId
    return this.props.updateProfile(formName, stateSync)
  }

  @requireLogin
  follow() {
    this.props.follow(this.profile.get('id'))
  }

  @requireLogin
  unfollow() {
    this.props.unfollow(this.profile.get('id'))
  }

  showFollowers = () => {
    this.props.getFollowers({ uid: this.profile.get('id') })
    this.setState({ openModal: true, dataType: 'followers' })
  }

  showFollowings = () => {
    this.props.getFollowings({ uid: this.profile.get('id') })
    this.setState({ openModal: true, dataType: 'followings' })
  }

  closeModal = () => this.setState({ openModal: false })

  render() {
    const { renderAppBar = true } = this.props
    return (
      <Transition >
        <div style={ { marginTop: 50 } }>
          { renderAppBar && <CommonAppBar history={ this.props.history } /> }
          { this.content() }
        </div>
      </Transition>
    )
  }

  content() {
    const loader = <CircularProgress
      style={ { marginLeft: '45%', marginTop: '5rem' } }
    />
    const session = this.props.session.toJS()
    const visitorUid = session.user && session.user.id
    return <Container
      size={ 5 } center backgroundTheme="background-color-gray" style={ { marginTop: '14px', minHeight: '60vh' } }
    >
      {/*profile container*/ }
      <Container size={ 4 } center className="profile">
        {
          this.profile
            ? <div className="center">
              <div className="relative">
                <Avatar src={ this.profile.get('avatar') } size={ 128 } />
                { visitorUid === this.profile.get('id')
                  &&
                  <div className="edit-button">
                    <RaisedButton label="编辑" primary onClick={ this.editProfile } />
                  </div>
                }
                { this.renderFollowButton() }
              </div>

              <div>
                <h1 className="username serif">
                  { this.profile.get('nickName') }
                </h1>
              </div>

              <div>
                <p className="bio">
                  { this.profile.get('bio') }
                </p>
              </div>
              {
                this.profile.get('followersCount') > 0
                &&
                <div>
                  <p className="follow-count">
                    <span onClick={ this.showFollowers }>
                      { `${this.profile.get('followersCount')}人关注` }
                    </span>
                  </p>
                </div>
              }
              {
                this.profile.get('followingCount') > 0
                &&
                <div>
                  <p className="follow-count">
                    <span onClick={ this.showFollowings }>

                      { `关注${this.profile.get('followingCount')}人` }
                    </span>
                  </p>
                </div>
              }

            </div>
            : loader
        }
        { this.renderModal() }
      </Container>

      {/*posts container*/ }
      <Container size={ 4 } center className="profile-posts mt2">

        {
          !this.posts
            ? loader
            : <PostList posts={ this.posts } />
        }
      </Container>
    </Container>
  }

  renderModal() {
    if (!this.state.dataType) {
      return null
    }
    const data = this.props[this.state.dataType]

    if (!data) {
      return null
    }

    const actions = [
      <FlatButton onClick={ this.closeModal } label="关闭" />
    ]

    const visitorUid = this.props.session.getIn(['user', 'id'])
    return <Dialog open={ this.state.openModal } onRequestClose={ this.closeModal } actions={ actions }>
      <ListComponent >
        { data.map(v => {

          const follow = (e) => {
            e.stopPropagation()
            this.props.follow(v.get('id'))
          }

          const unfollow = (e) => {
            e.stopPropagation()
            this.props.unfollow(v.get('id'))
          }

          const followed = v.get('followedUser')

          const rightButton = v.get('id') !== visitorUid
            ? <RaisedButton
              label={ !followed ? '关注' : '取消关注' }
              onClick={ !followed ? follow : unfollow }
              primary
            />
            : null

          return <ListItem
            key={ v.get('id') }
            onClick={ (e) => {
              this.closeModal()
              this.props.history.push(`/profile/${v.get('id')}`)
            } }
            leftAvatar={ <MAvatar size={ 36 } src={ v.get('avatar') } /> }
            rightAvatar={ rightButton }
            primaryText={ v.get('nickName') }
          />
        }) }
      </ListComponent>
    </Dialog>
  }

  renderFollowButton() {
    const visitorUid = this.props.session.getIn(['user', 'id'])
    if (visitorUid === this.profile.get('id')) {
      return null
    }
    return <div className="follow-button">
      {
        this.profile.get('followedUser')
          ? < RaisedButton label="取消关注" primary onClick={ this.unfollow } />
          : < RaisedButton label="关注" primary onClick={ this.follow } />
      }
    </div>
  }


}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)



