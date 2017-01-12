import React = require('react')
import { CommentAuthor, CommentAvatar } from './header'
import Editor from '../editor'
import { Serlizer } from '../editor/utils/serializer'
import { EditorState } from 'draft-js'

interface CommentRowProps {
  comment: IComment
  children?
}

export default ({comment, children = null}: CommentRowProps) => {
  if (typeof comment.content === undefined) {
    throw new Error(`invalid params ${comment}`)
  }

  return <div className="clearfix mt2 p2 bg-white">
    <CommentAvatar user={ comment.author } />
    <CommentAuthor user={ comment.author } />
    <div className="mt2">
      <Editor
        editorState={
          EditorState.createWithContent((Serlizer.deserialize(comment.content)))
        }
        />
    </div>
    { children }
  </div>
}



