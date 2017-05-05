import * as React from 'react'
import * as classnames from 'classnames'
import { Link } from 'react-router'
import Transition from '../../components/transition'
import Container from '../../components/container'
import { EditorState } from 'draft-js'
import Editor from '../../components/editor'
import { Serlizer } from '../../components/editor/utils/serializer'
import Avatar from '../../components/avatar'
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import Divider from 'material-ui/Divider'
import Chip from 'material-ui/Chip'
import Goback from '../../widgets/goback'

import { getProfile } from '../../actions/profile'
import { getUserPosts } from '../../actions/posts'
import { Map, List, OrderedMap } from 'immutable'
import Moment = require('moment')
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
  profile: Map<store, any>
  getProfile: (uid: string | number | any) => Promise<any>
  getUserPosts: (uid: string | number | any) => Promise<any>
  groupedPostsByAuthorId: OrderedMap<string, Post<any>>
  params
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
    groupedPostsByAuthorId: groupPostsByAuthorId(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getProfile: (uid) => dispatch(getProfile(uid)),
    getUserPosts: (uid) => dispatch(getUserPosts(uid))
  }
}

interface ProfileState {

}

class Profile extends React.Component<ProfileProps, ProfileState> {

  get userId() {
    return this.props.params.uid
  }

  get profile() {
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


  render() {
    const loader = <CircularProgress
      style={ { marginLeft: '45%', marginTop: '5rem' } }
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

        <Container size={ 5 } center>
          <Container size={ 3 } center className="pt3 pb3">
            {
              this.profile
                ? <CardHeader
                  title={ this.profile.get('nickName') }
                  titleStyle={ { fontSize: '2rem' } }
                  subtitle={ this.profile.get('bio') }
                  style={ { padding: '16px 0' } }
                  subtitleStyle={
                    { fontSize: '0.9rem', width: '90%', margin: '1rem 0' }
                  }
                  avatar={
                    <Avatar
                      size={ 96 }
                      src={ this.profile.get('avatar') }
                      style={ { float: 'right' } }
                    />
                  }
                >
                  <span className="block"
                    style={ { fontSize: '.9rem', lineHeight: '2rem' } }
                  >
                    加入日期:{
                      Moment(
                        new Date(this.profile.get('createdAt')),
                        'YYYYMMDD'
                      ).locale('zh-cn').format('L')
                    }

                  </span>
                  <Divider />

                </CardHeader>
                : loader
            }
          </Container>
        </Container>

        {/*posts container*/ }
        <Container size={ 5 } center>
          <Container size={ 3 } center>

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



