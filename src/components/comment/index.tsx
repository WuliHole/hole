import React = require('react')
import Container from '../container'
import './comment.style.less'
import HoleEditor from '../editor/'
import { EditorState } from 'draft-js'
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin'
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin'
import createButtonPlugin from '../editor/plugins/button/'
import { IGetComment, IPostComment } from '../../actions/comment'
import { Serlizer } from '../editor/utils/serializer'
import { CommentAuthor, CommentAvatar } from './header'
import CommentTable from './commentTable'
import { Map } from 'immutable'
interface ICommentFormProps {
  user: User
  article: ArticleModel
  postComment: IPostComment,
  children?
}

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

const sideToolbarPlugin = createSideToolbarPlugin()
const { SideToolbar } = sideToolbarPlugin;

let _postComment: IPostComment
let _article: ArticleModel
let _authorId: string

const ButtonPlugin = createButtonPlugin({
  text: '提交',
  theme: 'comment-submit',
  onClick: (e, store) => {
    const editorState = store.getItem('getEditorState')() as EditorState
    const content = Serlizer.serialize(editorState.getCurrentContent())
    if (!_authorId) {
      throw new Error('unexcept value')
    }

    if (!content) {
      throw new Error('unexcept value')
    }

    if (!_article.id) {
      throw new Error('unexcept value')
    }

    if (_postComment) {
      _postComment({
        postId: (_article.id) as string,
        content,
        authorId: _authorId
      }).then(() => {
        const setEditorState = store.getItem('setEditorState')
        if (setEditorState) {
          setTimeout(() => setEditorState(EditorState.createEmpty()), 100)
        }
      })
    }
  }
})

const {Button} = ButtonPlugin

const plugins = [
  inlineToolbarPlugin,
  sideToolbarPlugin,
  ButtonPlugin
]

export default ({
  user,
  article,
  postComment,
  children = null
}: ICommentFormProps) => {
  _postComment = postComment
  _article = article
  _authorId = user.id
  return <Container size={ 3 } center>
    <div className="clearfix m4 p2 bg-white">
      <CommentAvatar user={ user } />
      <CommentAuthor user={ user } />
      <div className="comment-form mt3 ">
        <HoleEditor plugins={ plugins } placeholder=".......写个评论" >
          <InlineToolbar></InlineToolbar>
          <SideToolbar></SideToolbar>
          <Button></Button>
        </HoleEditor>
      </div>
    </div>
    { children }
  </Container>
}


export {
  CommentAuthor,
  CommentAvatar,
  CommentTable
}
