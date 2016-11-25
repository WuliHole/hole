import * as React from 'react';
import Container from '../components/container';
import { updateArticleList } from '../actions/article';
const connect = require('react-redux').connect;

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
    return <Container size={4} center>
      <h2 className="caps">Article List</h2>
      <p>{article.get('hasError', false) }</p>
      <ArticleLsit
        data={article.get('articleList') }
        isLoading={this.props.article.get('isLoading') }
        hasError={this.props.article.get('hasError') }
        />
      <p>
        Rangle.io is a next-generation HTML5 design and development firm
        dedicated to modern, responsive web and mobile applications.
      </p>
    </Container>
  }
}
interface IArticleList extends React.Props<any> {
  data: any
  isLoading: boolean
  hasError: boolean
}

class ArticleLsit extends React.Component<IArticleList, void> {
  constructor(props) {
    super(props)
  }

  render() {
    let {data, isLoading, hasError} = this.props;
    data = data.toJS();
    if (isLoading) {
      return <Container size={4} center>
        im Waiting  load.
      </Container>
    }

    if (hasError) {
      return <div className="err">error</div>
    }
    
    if (data.length === 0) {
      return <Container size={4} center>
        there is no Content
      </Container>
    }

    return (<Container size={4} center>
      {data.map((article) => <div
        className="article-list-item-wrap"
        key={article.id}>
        <h2>{article.title}</h2>
        <p>{article.content}</p>
      </div>) }
    </Container>

    )
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlePage)
