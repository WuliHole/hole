const connect = require('react-redux').connect;
import * as React from 'react';
import Container from '../components/container';
import Icon from '../components/icon';
import { updateArticleList } from '../actions/article';
import { ArticleList, ArticleItem } from '../components/article'
import { List } from 'immutable'
import Alert from '../components/alert'

interface IReadingPageProps extends React.Props<any> {
  article
  routeParams: {
    articleTitle: string
    userName: string
  }
}

function mapStateToProps(state) {
  return {
    article: state.article,
    router: state.router,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

class ReadingPage extends React.Component<IReadingPageProps, void> {
  constructor(props) {
    super(props);
  }

  private findTargetArticle() {
    const {article} = this.props;
    const {userName, articleTitle} = this.props.routeParams
    const articles = article.get('articleList')
    return articles
      .find(articleInfo =>
        articleInfo.get('author').toLowerCase() === userName.toLowerCase()
        && articleInfo.get('title') === this.strip(articleTitle)
      )
  }

  strip(title: string): string {
    return title ? title.replace(/-/g, '') : ''
  }

  render() {
    const targetArticle = this.findTargetArticle()

    return <Container size={ targetArticle ? 4 : 1 } center>
      {
        targetArticle
          ? <ArticleItem
            articleInfo={ targetArticle.toJS() }
            />
          : <div className="not-found">
            <Alert status="error" isVisible={ true }>
              <span className="not-found-text">
                <Icon name="jinggao" />文章未找到
              </span>
            </Alert>
          </div>
      }
    </Container>
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReadingPage)
