import React = require('react')
import Icon from '../icon'
import ArticleItem from './article-item'
import Container from '../container';

interface IArticleListProps extends React.Props<any> {
  data: any
  isLoading: boolean
  hasError: boolean
}

export default
  class ArticleList extends React.Component<IArticleListProps, void> {

  constructor(props) {
    super(props)
  }

  render() {
    let {data, isLoading, hasError} = this.props;
    data = data.toJS();

    if (isLoading) {
      return <Container size={ 4 } center>
        im Waiting  load.
      </Container>
    }

    if (hasError) {
      return <div className="err">error</div>
    }

    if (data.length === 0) {
      return <Container size={ 4 } center>
        <Icon name="dangan">
          没有内容哦
        </Icon>
      </Container>
    }

    return (
      <Container size={ 4 } center>
        {
          data.map((article) => {
            return <ArticleItem
              key={article.title}
              title={ article.title }
              content={ article.content }>
            </ArticleItem>
          })
        }
      </Container>
    )
  }
}
