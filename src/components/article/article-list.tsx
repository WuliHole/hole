import React = require('react')
import Icon from '../icon'
import ArticleItem from './article-item'
import Container from '../container';
import { List } from 'immutable'
interface IArticleListProps extends React.Props<any> {
  data: List<ArticleModel>
  isLoading: boolean
  hasError: boolean
}

export default
  class ArticleList extends React.Component<IArticleListProps, void> {

  constructor(props) {
    super(props)
  }

  render() {
    let {data, isLoading, hasError} = this.props
    const ArticlesInfo = data.toJS()

    if (isLoading) {
      return <Container size={ 4 } center>
        im Waiting  load.
      </Container>
    }

    if (hasError) {
      return <div className="err">error</div>
    }

    if (ArticlesInfo.length === 0) {
      return <Container size={ 4 } center>
        <Icon name="dangan">
          没有内容哦
        </Icon>
      </Container>
    }

    return (
      <Container size={ 4 } center>
        {
          ArticlesInfo.map((article) => {
            return <ArticleItem
              key={ article.id }
              articleInfo={ article }
              >
            </ArticleItem>
          })
        }
      </Container>
    )
  }
}
