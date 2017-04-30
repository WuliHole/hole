import React = require('react')
import Avatar from '../avatar'

export const CommentAvatar = ({ user }) => (
  <div className="left mr1 ">  <Avatar src={ user.avatar } /></div>
)

export const CommentAuthor = ({ user }) => (
  <div className="overflow-hidden">
    <p className="comment-user">{ user.first } { user.last }</p>
  </div>
)
