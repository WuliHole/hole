import React = require('react')
import Avatar from '../avatar'
import { Link } from 'react-router'

export const CommentAvatar = ({ user }) => (
  <Link to={ `/profile/${user.id}` }>
    <div className="left mr1 ">  <Avatar src={ user.avatar } size={ 48 } /></div>
  </Link  >
)

export const CommentAuthor = ({ user }) => (
  <div className="overflow-hidden">
    <p className="comment-user">{ user.nickName }</p>
  </div>
)
