import React = require('react')
import Icon from '../icon'
import ArticleItem from './article-item'
import Container from '../container';
import { List } from 'immutable'
interface IArticleListProps extends React.Props<any> {
  data: List<Post<any>>
  isLoading: boolean
  hasError: boolean
}

export default
  class ArticleList extends React.Component<IArticleListProps, {}> {

  constructor(props) {
    super(props)
  }

  render() {
    let { data, isLoading, hasError } = this.props
    const ArticlesInfo = data.toJS()

    if (isLoading) {
      return <Container size={ 3 } center>
        im Waiting  load.
      </Container>
    }

    if (hasError) {
      return <div className="err">error</div>
    }

    if (ArticlesInfo.length === 0) {
      return <Container size={ 3 } center>
        <Icon name="dangan">
          没有内容哦
        </Icon>
      </Container>
    }

    return (
      <Container size={ 3 } center>
        {
          ArticlesInfo.map((article) => {
            return <ArticleItem
              className={ 'm2 bg-white article-item-shadow' }
              key={ article.id }
              articleInfo={ article }
              maxLength={ 150 }
            >
            </ArticleItem>
          })
        }
      </Container>
    )
  }
}

