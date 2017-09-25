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
import CircularProgress from 'material-ui/CircularProgress'
import Goback from '../../widgets/goback'
import RaisedButton from 'material-ui/RaisedButton'
import { getProfile, follow, unfollow } from '../../actions/profile'
import { getPublished, create } from '../../actions/posts'
import { Map, List, OrderedMap } from 'immutable'
import { updateUserInfo } from '../../actions/session'
import { isRejectedAction } from '../../actions/utils'
import { GET_PROFILE_SUCCESS } from '../../constants/profile'
import { unique } from '../../utils/arrayUtils'
import isLogin from '../../store/isLogin'
import { groupPostsByAuthorId } from '../../redux-selector/posts'
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
  follow: (uid: string | number | any) => Promise<any>
  unfollow: (uid: string | number | any) => Promise<any>
  groupedPostsByAuthorId: GroupedPosts
  params
  renderAppBar?: boolean
}

type GroupedPosts = OrderedMap<number, Map<string, Map<keyof Post<any>, any>>>

function mapStateToProps(state, props) {
  return {
    profile: state.profile,
    groupedPostsByAuthorId: groupPostsByAuthorId(state),
    session: state.session,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getProfile: bindActionCreators(getProfile, dispatch),
    getUserPosts: bindActionCreators(getPublished, dispatch),
    follow: bindActionCreators(follow, dispatch),
    unfollow: bindActionCreators(unfollow, dispatch),
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

class Profile extends React.Component<ProfileProps, {}> {

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
    if (!this.profile) {
      this.props.getProfile(this.userId)
    }

    // @Fix:In some case,posts always emepty
    if (this.posts.length === 0) {
      this.props.getUserPosts(this.userId)
    }
  }

  onSave = (formName: string) => {
    let myUserId = this.props.session.getIn(['user,id'])
    const stateSync = this.profile.get('id') === myUserId
    return this.props.updateProfile(formName, stateSync)
  }

  follow = () => {
    this.props.follow(this.profile.get('id'))
  }

  unfollow = () => {
    this.props.unfollow(this.profile.get('id'))
  }

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
    return <Transition>
      <Container size={ 5 } center backgroundTheme="background-color-gray" style={ { marginTop: '14px', minHeight: '60vh' } }>
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

                <div>
                  <p className="follow-count">
                    {
                      this.profile.get('followersCount') > 0
                      && `${this.profile.get('followersCount')} 人关注`
                    }
                  </p>
                </div>
              </div>
              : loader
          }
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
    </Transition>
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

  editProfile = () => {
    this.props.history.push('/dashboard/setting')
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)



