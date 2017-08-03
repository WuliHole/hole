import * as React from 'react'
import { bindActionCreators } from 'redux'
import * as classnames from 'classnames'
import { Link } from 'react-router'
import Moment = require('moment')
import Transition from '../../components/transition'
import Container from '../../components/container'
import { EditorState } from 'draft-js'

import { Serlizer } from '../../components/editor/utils/serializer'
import CommonAppBar from '../../widgets/commonAppBar'
import CircularProgress from 'material-ui/CircularProgress'
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
import isLogin from '../../store/isLogin'
import { groupPostsByAuthorId } from '../../redux-selector/posts'
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
  params
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

class Profile extends React.Component<ProfileProps, void> {

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

  render() {
    const profileForm = <ProfileForm
      profile={ this.profile }
      onSave={ this.onSave }
    />

    return (
      <Transition >
        <div style={ { marginTop: 50 } }>
          <CommonAppBar history={ this.props.history } />
          { this.content() }
        </div>

      </Transition>
    )
  }

  content() {
    const loader = <CircularProgress
      style={ { marginLeft: '45%', marginTop: '5rem' } }
    />
    return <Container size={ 5 } center backgroundTheme="background-color-gray profile-container" style={ { marginTop: '14px' } }>
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
            : <PostList posts={ this.posts } />
        }
      </Container>
    </Container>
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)



