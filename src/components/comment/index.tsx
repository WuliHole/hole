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
import resolveTitle from 'utils/resolveTitleFromContent'
interface ICommentFormProps {
  user: User
  post: Map<keyof Post<any>, any>
  postComment: IPostComment,
  children?
  submitButton?: JSX.Element
}

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

const sideToolbarPlugin = createSideToolbarPlugin()
const { SideToolbar } = sideToolbarPlugin;

let _postComment: IPostComment
let _post: Post<any>
let _authorId: number
let text: string = '提交'

const ButtonPlugin = createButtonPlugin({
  text,
  theme: 'comment-submit',
  onClick: (e, store) => {
    const editorState = store.getItem('getEditorState')() as EditorState
    const content = Serlizer.serialize(editorState.getCurrentContent())
    if (!_authorId) {
      throw new Error('unexcept authorId')
    }

    if (!content) {
      throw new Error('unexcept content')
    }

    if (!_post.id) {
      throw new Error('unexcept post.id')
    }

    if (_postComment) {
      _postComment({
        postId: (_post.id),
        postOwnerId: _post.authorId,
        postTitle: resolveTitle(_post.content),
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

const { Button } = ButtonPlugin

const plugins = [
  inlineToolbarPlugin,
  sideToolbarPlugin,
  ButtonPlugin
]

export default ({
  user,
  post,
  postComment,
  children = null,
  submitButton = <Button />
}: ICommentFormProps) => {
  _postComment = postComment
  _post = post && post.toJS()
  _authorId = user && user.id
  return <div className="clearfix  p2  bg-white">
    { user && <CommentAvatar user={ user } /> }
    { user && <CommentAuthor user={ user } /> }
    <div className="comment-form mt3 ">
      <HoleEditor
        readonly={ false }
        plugins={ plugins }
        placeholder=".......写个评论"
      >
        <InlineToolbar></InlineToolbar>
        <SideToolbar></SideToolbar>
        { submitButton }
      </HoleEditor>
    </div>
    { children }
  </div>
}


export {
  CommentAuthor,
  CommentAvatar,
  CommentTable
}
