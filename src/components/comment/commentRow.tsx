import React = require('react')
import { CommentAuthor, CommentAvatar } from './header'
import Editor from '../editor'
import { Serlizer } from '../editor/utils/serializer'
import { EditorState } from 'draft-js'

interface CommentRowProps {
  comment: IComment
  children?
}

export default ({ comment, children = null }: CommentRowProps) => {
  if (typeof comment.comment === undefined) {
    throw new Error(`invalid params ${comment}`)
  }
  const author = comment.author
  return <div className="clearfix mt2 p2 bg-white">
    { author && <CommentAvatar user={ author } /> }
    { author && <CommentAuthor user={ author } /> }
    <div className="mt2">
      <Editor
        editorState={
          EditorState.createWithContent((Serlizer.deserialize(comment.comment)))
        }
      />
    </div>
    { children }
  </div>
}



