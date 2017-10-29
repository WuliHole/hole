import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as React from 'react'
import * as  classNames from 'classnames'
import { PropTypes } from 'react'
import Container from '../components/container'
import { getById, edit, upvotePost, removeUpvoteRecord } from '../actions/posts'
import { ArticleItem } from '../components/article'
import { List, Map, is } from 'immutable'
import {
  default as CommentForm,
  CommentTable
} from '../components/comment'
import {
  makeLoginButton,
  LoginButtonProps
} from '../components/login/login-modal'
import { postComment, getComments, IGetComment } from '../actions/comment'
import { findPostById } from '../redux-selector/posts'
import { getCommentByPostId } from '../redux-selector/comments'
import CircularProgress from 'material-ui/CircularProgress'
import CommonAppBar from '../widgets/commonAppBar'
import { RaisedButton, Checkbox } from 'material-ui'
import Like from 'material-ui/svg-icons/action/favorite';
import LikeBorder from 'material-ui/svg-icons/action/favorite-border';
import { requireLogin } from 'app/middleware/requireLogin'
import { ScrollerReset } from '../components/scrollerReset/scrollerReset'
import './reading-page.less'
interface ReadingPageProps extends React.Props<any> {
  comments: List<IComment>
  getComments: IGetComment
  user
  getPostById: (id: string) => Promise<any>
  posts: Map<keyof { meta, isLoading: boolean }, any>
  post: Map<keyof Post<any>, any>
  params: {
    postTitle: string
    id: string
  }
  postComment
  history
  edit: typeof edit
  loginButton: () => (props: LoginButtonProps) => JSX.Element
  upvote: typeof upvotePost
  removeUpvoteRecord: typeof removeUpvoteRecord
}


function mapStateToProps(state, props: ReadingPageProps) {
  return {
    user: state.session.get('user'),
    post: findPostById(state, props),
    comments: getCommentByPostId(state, props),
    posts: state.posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPostById: id => dispatch(getById(id)),
    postComment: (params) => dispatch(postComment(params)),
    getComments: (postId) => dispatch(getComments(postId)),
    loginButton: () => ReadingPage.loginButton(dispatch),
    edit: bindActionCreators(edit, dispatch),
    upvote: bindActionCreators(upvotePost, dispatch),
    removeUpvoteRecord: bindActionCreators(removeUpvoteRecord, dispatch)
  }
}

class ReadingPage extends React.Component<ReadingPageProps, {}> {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (!this.post) {
      this.props.getPostById(this.props.params.id)
    }

    if (!this.comments) {
      this.props.getComments(parseInt(this.props.params.id, 10))
    }
  }

  get post() {
    return this.props.post
  }

  get comments() {
    return this.props.comments
  }

  upvoted(): boolean {
    if (!this.post) {
      return false
    }

    return !!this.post.get('upvoted')
  }

  onClickUpvoteButton = () => {
    if (!this.post) {
      return
    }

    if (this.upvoted()) {
      this.removeUpvoteRecord()
    } else {
      this.upvote()
    }
  }

  @requireLogin
  upvote() {
    const post = this.post
    if (post) {
      return this.props.upvote(post.get('id'))
    }
  }

  @requireLogin
  removeUpvoteRecord() {
    const post = this.post
    if (post) {
      return this.props.removeUpvoteRecord(post.get('id'))
    }
  }

  isAuthor() {
    if (!this.props.user || !this.post) {
      return false
    }
    return this.props.user.get('id') === this.post.getIn(['authorId'])
  }

  edit = () => {
    if (this.isAuthor()) {
      this.props.edit(this.post.get('id'))
      this.props.history.push(`/post/${this.post.get('id')}/edit`)
    }
  }

  render() {
    const post = this.post
    const commetTable = this.props.comments
    const comments = this.comments ? this.comments.toJS() : []

    let loginButton
    if (!this.props.user) {
      const LoginButton = this.props.loginButton()
      loginButton = (
        < LoginButton
          text="登录以评论"
          className="font-size-m"
          style={ {
            background: 'rgba(0,0,0,0)',
            boxShadow: 'none'
          } }
          buttonStyle={ {
            width: '100px',
            borderRadius: '4px',
            background: '#000',
            color: '#fff'
          } }
        />
      )
    }
    return <ScrollerReset >
      <div >

        <div className="bg-white pt4">
          <CommonAppBar history={ this.props.history } style={ { background: 'rgba(0, 0, 0, 0)' } } />
          <Container size={ 4 }
            center
            style={ { minHeight: '320px' } }>
            {
              !post && <CircularProgress style={ { left: '50%' } } />
            }
            { post && <ArticleItem
              post={ post }
              rightIcon={ ReadingPage.makeEditButton(this) }
            /> }
            <div className="pl2 pb2 ">
              <div className="checkbox-group inline-block">
                <Checkbox
                  className="inline-block"
                  checkedIcon={ <Like className="upvote-button" /> }
                  uncheckedIcon={ <LikeBorder className="upvote-button-border" /> }
                  onCheck={ this.onClickUpvoteButton }
                  checked={ this.upvoted() }
                  iconStyle={ { marginRight: '5px', height: 20, width: 20 } }
                  label={ post && post.get('upvoteCount') }
                />
              </div>
            </div>

          </Container>
        </div>

        <Container size={ 3 } center
          style={ { minHeight: '80px' } }
          className="mt3 mb3"
          backgroundTheme=""
        >
          <CommentForm
            user={ this.props.user && this.props.user.toJS() }
            post={ post }
            postComment={ this.props.postComment }
            submitButton={ loginButton }
          >
          </CommentForm>
          <div style={ { marginTop: '30px' } }>
            <CommentTable comments={ comments } />
          </div>
        </Container>

      </div>
    </ScrollerReset >
  }

  static makeEditButton(context) {
    return context.isAuthor()
      ? <RaisedButton
        primary
        label="编辑"
        onClick={ context.edit }
      />
      : null
  }

  static loginButton(dispatch) {
    return makeLoginButton(dispatch)
  }

  static contextProps = {
    displayError: PropTypes.func
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReadingPage)
