import React = require('react')
import Avatar from '../avatar'
import Container from '../container'
import './comment.style.less'
import HoleEditor from '../editor/'
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin'
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin'
import createButtonPlugin from '../editor/plugins/button/'

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

const sideToolbarPlugin = createSideToolbarPlugin()
const { SideToolbar } = sideToolbarPlugin;

const ButtonPlugin = createButtonPlugin({
  text: '提交',
  theme: 'comment-submit',
  onClick: () => { }
})

const {Button} = ButtonPlugin

const plugins = [
  inlineToolbarPlugin,
  sideToolbarPlugin,
  ButtonPlugin
]



interface ICommentProps {
  user: User
  article: ArticleModel
}

export default ({user, article }: ICommentProps) => {
  return <Container size={ 3 } center>
    <div className="clearfix m4 p2 bg-white">
      <div className="left mr1 ">  <Avatar src={ user.avatar } /></div>
      <div className="overflow-hidden">
        <p className="comment-user">{ user.first } { user.last }</p>
      </div>
      <div className="comment-form mt3 ">
        <HoleEditor plugins={ plugins } placeholder=".......写个评论" >
          <InlineToolbar></InlineToolbar>
          <SideToolbar></SideToolbar>
          <Button></Button>
        </HoleEditor>
      </div>
    </div>
  </Container>
}
