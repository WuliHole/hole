const connect = require('react-redux').connect
import { bindActionCreators } from 'redux'
import * as React from 'react'
import { PropTypes } from 'react'
import Container from '../components/container'
import Icon from '../components/icon'
import { getById, edit } from '../actions/posts'
import { ArticleList, ArticleItem } from '../components/article'
import { List, Map } from 'immutable'
import Alert from '../components/alert'
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
import { RaisedButton } from 'material-ui'

interface IReadingPageProps extends React.Props<any> {
  article
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
}


function mapStateToProps(state, props: IReadingPageProps) {
  return {
    article: state.article,
    router: state.router,
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
    edit: bindActionCreators(edit, dispatch)
  }
}

class ReadingPage extends React.Component<IReadingPageProps, {}> {

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
    return this.props.post && this.props.post.toJS()
  }

  get comments() {
    return this.props.comments
  }

  isAuthor() {
    if (!this.props.user || !this.post) {
      return false
    }
    return this.props.user.get('id') === this.post.author.id
  }

  edit = () => {
    if (this.isAuthor()) {
      this.props.edit(this.post.id)
      this.props.history.push(`/post/${this.post.id}/edit`)
    }
  }


  render() {
    const post = this.post

    if (!post) {
      return <div className="not-found">
      </div>
    }

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
    return <div >
      <div className="bg-white pt4">
        <CommonAppBar history={ this.props.history } />
        <Container size={ post ? 4 : 1 }
          center
          style={ { minHeight: '320px' } }>
          <ArticleItem
            articleInfo={ post }
            rightIcon={
              ReadingPage.makeEditButton(this)
            }
          />
        </Container>
      </div>
      <Container size={ 3 } center
        style={ { minHeight: '80px' } }
        className="mt3 mb3"
        backgroundTheme=""
      >
        <CommentForm
          user={ this.props.user && this.props.user.toJS() }
          article={ post }
          postComment={ this.props.postComment }
          submitButton={ loginButton }
        >
        </CommentForm>
        <div style={ { marginTop: '30px' } }>
          <CommentTable comments={ comments } />
        </div>
      </Container>

    </div>
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
