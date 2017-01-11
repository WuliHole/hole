const connect = require('react-redux').connect;
import * as React from 'react';
import Container from '../components/container';
import Icon from '../components/icon';
import { updateArticleList } from '../actions/article';
import { ArticleList, ArticleItem } from '../components/article'
import { List } from 'immutable'
import Alert from '../components/alert'
import Comment from '../components/comment'

interface IReadingPageProps extends React.Props<any> {
  article
  user
  routeParams: {
    articleTitle: string
    userName: string
  }
}

function mapStateToProps(state) {
  return {
    article: state.article,
    router: state.router,
    user: state.session.get('user')
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export function findTargetArticle(props) {
  const {article} = props;
  const {userName, articleTitle, id} = props.routeParams
  const articles = article.get('articleList')
  return articles.find(articleInfo => article.get('id') === id)
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

    return <div >
      {
        targetArticle
        &&
        <div className="bg-white">
          <Container size={ targetArticle ? 4 : 1 } center>
            <ArticleItem
              articleInfo={ targetArticle }
              className={ 'm4' }
              />
          </Container>
        </div>
      }
      {
        targetArticle
        &&
        <Comment
          user={ this.props.user.toJS() }
          article={ targetArticle }
          >
        </Comment>
      }
      {
        !targetArticle
        &&
        <div className="not-found">
          <Alert status="error" isVisible={ true }>
            <span className="not-found-text">
              <Icon name="jinggao" />文章未找到
              </span>
          </Alert>
        </div>
      }
    </div>
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReadingPage)
