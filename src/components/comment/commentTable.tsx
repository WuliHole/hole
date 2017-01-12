import React = require('react')
import CommentRow from './commentRow'
import { List } from 'immutable'
import Container from '../container'

interface CommentTableProps {
  comments: IComment[]
}

export default ({comments}: CommentTableProps) => {
  return <Container size={ 3 } center>
    <div className="clearfix ml4 mr4 mb4 ">
      {
        List(comments)
          .map(comment => <CommentRow key={ comment.id } comment={ comment } />)
          .toJS()
      }
    </div>
  </Container>
}
