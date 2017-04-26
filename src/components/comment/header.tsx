import React = require('react')
import Avatar from '../avatar'

export const CommentAvatar = ({ user }: { user: User }) => (
  <div className="left mr1 ">  <Avatar src={ user.avatar } /></div>
)

export const CommentAuthor = ({ user }: { user: User }) => (
  <div className="overflow-hidden">
    <p className="comment-user">{ user.nickName }</p>
  </div>
)
