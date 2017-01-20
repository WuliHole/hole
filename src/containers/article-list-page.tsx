const connect = require('react-redux').connect;
import * as React from 'react';
import Container from '../components/container';
import Icon from '../components/icon';
import { updateArticleList } from '../actions/article';
import { ArticleList } from '../components/article'

interface IAritclePageProps extends React.Props<any> {
  article: any;
  fetchArticles: () => void;
}

function mapStateToProps(state) {
  return {
    article: state.article,
    router: state.router,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchArticles: () => dispatch(updateArticleList()),
  };
}

class ArticlePage extends React.Component<IAritclePageProps, void> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchArticles();
  }

  render() {
    const {article} = this.props;
    return <div style={ { width: '1050px' } } className="max-auto">
      <Container size={ 3 } center={ true }>
        <ArticleList
          data={ article.get('articleList') }
          isLoading={ this.props.article.get('isLoading') }
          hasError={ this.props.article.get('hasError') }
          />
      </Container>
    </div>
  }
}





export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlePage)
