import React = require('react')
import CommentRow from './commentRow'
import { List } from 'immutable'
import Container from '../container'

interface CommentTableProps {
  comments: IComment[]
}

export default ({ comments }: CommentTableProps) => {
  if (comments.length === 0) {
    return null
  }

  return <Container size={ 3 } center backgroundTheme="">
    <div className="clearfix">
      {
        List(comments)
          .map(comment => <CommentRow key={ comment.id } comment={ comment } />)
          .toJS()
      }
    </div>
  </Container>
}
