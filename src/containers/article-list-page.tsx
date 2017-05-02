const connect = require('react-redux').connect;
import * as React from 'react';
import Container from '../components/container';
import Icon from '../components/icon';
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
    fetchArticles: () => void 0
  }
}

class ArticlePage extends React.Component<IAritclePageProps, void> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchArticles();
  }

  render() {
    const { article } = this.props;
    return <Container size={ 4 } center={ false }>
      <ArticleList
        data={ article.get('articleList') }
        isLoading={ this.props.article.get('isLoading') }
        hasError={ this.props.article.get('hasError') }
      />
    </Container>
  }
}





export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlePage)
