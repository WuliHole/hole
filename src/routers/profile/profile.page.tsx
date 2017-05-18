import * as React from 'react'
import * as classnames from 'classnames'
import { Link } from 'react-router'
import Moment = require('moment')
import Transition from '../../components/transition'
import Container from '../../components/container'
import { EditorState } from 'draft-js'
import Editor from '../../components/editor'
import { Serlizer } from '../../components/editor/utils/serializer'
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import Divider from 'material-ui/Divider'
import Chip from 'material-ui/Chip'
import Goback from '../../widgets/goback'
import ProfileForm from '../../widgets/profile'
import RaisedButton from 'material-ui/RaisedButton'
import { getProfile } from '../../actions/profile'
import { getUserPosts } from '../../actions/posts'
import { Map, List, OrderedMap } from 'immutable'
import { update } from '../../actions/session'
import { isRejectAction } from '../../actions/utils'
import { GET_PROFILE_SUCCESS } from '../../constants/profile'
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import { primary1Color } from '../../store/theme'
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
  groupedPostsByAuthorId: OrderedMap<string, Post<any>>
  params
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
    groupedPostsByAuthorId: groupPostsByAuthorId(state),
    session: state.session
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getProfile: (uid) => dispatch(getProfile(uid)),
    getUserPosts: (uid) => dispatch(getUserPosts(uid)),
    updateProfile: (formName, sync = false) => {
      return dispatch(update(formName)).then(state => {
        if (!isRejectAction(state)) {
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

}

class Profile extends React.Component<ProfileProps, ProfileState> {

  get userId() {
    return this.props.params.uid
  }

  get profile(): Map<keyof User, any> {
    return this.props.profile.getIn(['meta', this.userId])
  }

  get posts(): Post<any>[] {
    return this.props.groupedPostsByAuthorId.toJS()[this.userId]
  }

  // load profile if didn't  find the profile of target user .
  componentDidMount() {
    if (!this.profile) {
      this.props.getProfile(this.userId)
    }

    if (!this.posts) {
      this.props.getUserPosts(this.userId)
    }
  }

  onSave = (formName: string) => {
    let myUserId = this.props.session.getIn(['user,id'])
    const stateSync = this.profile.get('id') === myUserId
    return this.props.updateProfile(formName, stateSync)
  }

  render() {
    const loader = <CircularProgress
      style={ { marginLeft: '45%', marginTop: '5rem' } }
    />

    const profileForm = <ProfileForm
      profile={ this.profile }
      onSave={ this.onSave }
    />

    return (
      <Transition>
        <AppBar
          iconElementLeft={ <Goback style={ {
            color: primary1Color
          } }
            history={ this.props.history } />
          }
        />

        {/*profile container*/ }

        <Container size={ 5 } center
          backgroundTheme="background-color-gray"
          style={ { marginTop: '14px' } }
        >
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
        </Container>

        {/*posts container*/ }
        <Container size={ 5 } center backgroundTheme="background-color-gray">
          <Container size={ 4 } center className="profile-posts mt2">

            {
              !this.posts
                ? loader
                : this.posts.map(p => {
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
                    <Editor editorState={
                      EditorState.createWithContent(contentState)
                    } />
                    <Divider />
                  </div>
                })
            }
          </Container>
        </Container>
      </Transition>
    )
  }
}




export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)



