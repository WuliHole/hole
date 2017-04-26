const connect = require('react-redux').connect;
import * as React from 'react';
import Container from '../components/container';
import Icon from '../components/icon';
import { getById } from '../actions/posts';
import { ArticleList, ArticleItem } from '../components/article'
import { List, Map } from 'immutable'
import Alert from '../components/alert'
import {
  default as CommentForm,
  CommentTable
} from '../components/comment'

import { postComment } from '../actions/comment'
import { findPostById } from '../redux-selector/posts'
import { getCommentByPostId } from '../redux-selector/comments'
import CircularProgress from 'material-ui/CircularProgress'

interface IReadingPageProps extends React.Props<any> {
  article
  comments: List<IComment>
  user
  getPostById: (id: string) => Promise<any>
  posts: Map<keyof { meta, isLoading: boolean }, any>
  post: Post<any>
  params: {
    postTitle: string
    id: string
  }
  postComment
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
    postComment: (params) => dispatch(postComment(params))
  }
}


/**
 * @return List<IComment>  imuutable list
 */

type CommentTable = { [keys: string]: List<IComment> }


class ReadingPage extends React.Component<IReadingPageProps, void> {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.post) {
      this.props.getPostById(this.props.params.id)
    }
  }

  get post() {
    return this.props.post
  }

  get comments() {
    return this.props.comments
  }

  render() {
    const post = this.post

    if (!post) {
      return <div className="not-found">
        <Alert status="info" isVisible={ true }>
          <CircularProgress />
        </Alert>
      </div>
    }

    const commetTable = this.props.comments
    const comments = this.comments ? this.comments.toJS() : []

    return <div >
      <div className="bg-white">
        <Container size={ post ? 3 : 1 } center>
          <ArticleItem
            articleInfo={ post }
          />
        </Container>
      </div>

      <CommentForm
        user={ this.props.user.toJS() }
        article={ post }
        postComment={ this.props.postComment }
      >
      </CommentForm>
      <CommentTable comments={ comments } />
    </div>
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReadingPage)
