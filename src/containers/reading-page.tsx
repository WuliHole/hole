const connect = require('react-redux').connect;
import * as React from 'react';
import Container from '../components/container';
import Icon from '../components/icon';
import { updateArticleList } from '../actions/article';
import { ArticleList, ArticleItem } from '../components/article'
import { List, Map } from 'immutable'
import Alert from '../components/alert'
import {
  default as CommentForm,
  CommentTable
} from '../components/comment'

import { postComment } from '../actions/comment'

interface IReadingPageProps extends React.Props<any> {
  article
  comments
  user
  routeParams: {
    articleTitle: string
    userName: string
  }
  postComment
}

function mapStateToProps(state) {
  return {
    article: state.article,
    router: state.router,
    user: state.session.get('user'),
    comments: state.comment.get('comments')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    postComment: (params) => dispatch(postComment(params))
  }
}

export function findTargetArticle(props) {
  const {article} = props;
  const {userName, articleTitle, id} = props.routeParams
  const articles = article.get('articleList')
  return articles.find(articleInfo => articleInfo.get('id') === id)
}

/**
 * @return List<IComment>  imuutable list
 */

type CommentTable = { [keys: string]: List<IComment> }
export function findCommentByPostId(table: CommentTable, postId: string) {
  return Map(table).find((comment, key) => key === postId)
}

export function strip(title: string): string {
  return title ? title.replace(/-/g, '') : ''
}

class ReadingPage extends React.Component<IReadingPageProps, void> {
  constructor(props) {
    super(props);
  }

  render() {
    const articleImmutable = findTargetArticle(this.props)

    const targetArticle = articleImmutable
      ? articleImmutable.toJS()
      : null


    if (!targetArticle) {
      return <div className="not-found">
        <Alert status="error" isVisible={ true }>
          <span className="not-found-text">
            <Icon name="jinggao" />文章未找到
              </span>
        </Alert>
      </div>
    }

    const commetTable = this.props.comments
    const commentsImmutable = findCommentByPostId(commetTable, targetArticle.id)
    const comments = commentsImmutable ? commentsImmutable.toJS() : []

    return <div >
      <div className="bg-white">
        <Container size={ targetArticle ? 3 : 1 } center>
          <ArticleItem
            articleInfo={ targetArticle }
            />
        </Container>
      </div>

      <CommentForm
        user={ this.props.user.toJS() }
        article={ targetArticle }
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
