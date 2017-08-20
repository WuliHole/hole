import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as React from 'react'
import { History } from 'react-router'
import { Map, List, is } from 'immutable'
import { ContentState, EditorState } from 'draft-js'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import KeyboardBackspace
  from 'material-ui/svg-icons/hardware/keyboard-backspace'
import {
  Card, CardActions, CardHeader, CardMedia, CardTitle, CardText
} from 'material-ui/Card'
import Container from '../components/container'
import Transition from '../components/transition'
import Editor from '../components/editor/'
import { Serlizer } from '../components/editor/utils/serializer'
import GoBack from '../widgets/goback'
import { ArticleItem } from '../components/article'
import { update, getById, edit } from '../actions/posts'
import debounce from '../utils/debounce'
import './createNew.less'

import { defaultAvatar, default as Avatar } from '../components/avatar/index'
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin'

import { createAutoSavePlugin } from '../components/editor/plugins/autoSave/autosave.plugin'
import { createSideToolBarPlugin } from '../components/editor/plugins/side-tool-bar/index'
import { createImagePlugin } from '../components/editor/plugins/image/index'
import createAlignmentPlugin from 'draft-js-alignment-plugin'
import createFocusPlugin from 'draft-js-focus-plugin'
import { composeDecorators } from 'draft-js-plugins-editor'
import { isRejectedAction } from '../actions/utils'
const focusPlugin = createFocusPlugin()
const alignmentPlugin = createAlignmentPlugin()
const inlineToolbarPlugin = createInlineToolbarPlugin()
const sideToolbarPlugin = createSideToolBarPlugin()

const decorator = composeDecorators(
  alignmentPlugin.decorator,
  focusPlugin.decorator,
)

const imagePlugin = createImagePlugin({ decorator })
const { AlignmentTool } = alignmentPlugin
const { InlineToolbar } = inlineToolbarPlugin
const { SideToolbar } = sideToolbarPlugin

const plugins = [
  focusPlugin,
  alignmentPlugin,
  imagePlugin,
  inlineToolbarPlugin,
  sideToolbarPlugin,
]

interface ICreateNewProps {
  history
  location
  session: Map<any, any>
  updatePost: (id: number | string, content: ContentState) => Promise<any>
  posts
  getPostById: (pid: number | string) => Promise<any>
  params: { pid: string }
  editPost: typeof edit
}

interface ICreateNewState {
  saving?: boolean
}

function mapStateToProps(state) {
  return {
    session: state.session,
    posts: state.posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updatePost: (id, content) => dispatch(update(id, content)),
    getPostById: bindActionCreators(getById, dispatch),
    editPost: bindActionCreators(edit, dispatch)
  }
}


class CreateNew extends React.PureComponent<ICreateNewProps, ICreateNewState> {
  private autoSavePlugin

  static contextTypes = {
    displayError: React.PropTypes.func
  }

  state = {
    saving: false
  }
  get currentPost() {
    const currentEdit: number = this.props.posts.get('editing')
    return (this.props.posts.get('meta') as List<Map<keyof Post<any>, any>>)
      .find(v => v.get('id') === currentEdit)
  }

  get editorState() {
    if (!this.isAuthor()) {
      return
    }
    const content = this.currentPost && this.currentPost.toJS().content
    const editorState = content && EditorState.createWithContent(Serlizer.deserialize(content))
    return editorState
  }

  componentWillUnmount() {
    this.autoSavePlugin = null
  }

  componentWillMount() {
    this.autoSavePlugin = createAutoSavePlugin({ saveAction: this.save, debounceTime: 300 })
  }

  componentDidMount() {
    if (!this.currentPost) {
      if (this.props.params.pid) {
        this.loadCurrentPost()
      } else {
        this.context.displayError('加载失败.没有找到当前要编辑的文章')
      }
    }
  }

  loadCurrentPost() {
    this.props.getPostById(this.props.params.pid)
      .then(res => {
        if (isRejectedAction(res)) {
          this.context.displayError(res.payload.errMsg)
        } else {
          this.props.editPost(res.payload.id)
          if (!this.isAuthor()) {
            this.context.displayError('你没有编辑权限')
          }
        }
      })
  }

  isAuthor(): boolean {
    const user = this.props.session.get('user')
    const uid = user && user.get('id')
    const post = this.currentPost && this.currentPost.toJS()
    const authorId = post && post.author.id
    return uid === authorId
  }

  getUserInfo() {
    return this.props.session.get('user').toJS()
  }


  save = (state: EditorState) => {
    if (!this.currentPost) {
      return
    }
    this.setState({ saving: true })
    this.props.updatePost(this.currentPost.get('id'), state.getCurrentContent())
      .then(() => this.setState({ saving: false }))
  }



  render() {
    const style = { marginTop: '.3rem' }
    const Save = this.state.saving
      ? <RaisedButton label="正在保存"
        style={ style } secondary onClick={ this.autoSavePlugin.save } />
      : <RaisedButton label="保存"
        style={ style } primary onClick={ this.autoSavePlugin.save } />

    const { avatar, nickName, bio } = this.getUserInfo()

    return <div>
      <AppBar
        style={ { position: 'fixed' } }
        title="新建文章"
        titleStyle={ { textAlign: 'center' } }
        iconElementLeft={ <GoBack history={ this.props.history } /> }
        iconElementRight={ Save }
      >
      </AppBar>
      <div className="create-new-container p4">
        <Container size={ 4 } center>
          <Card className="create-new-content-container">
            <CardHeader
              title={ nickName }
              subtitle={ bio }
              avatar={ <Avatar src={ avatar } size={ 48 } /> }
            />
            <CardText>
              { this.editorState &&
                <Editor
                  plugins={ plugins.concat([this.autoSavePlugin]) }
                  editorState={ this.editorState }
                >
                  <AlignmentTool />
                  <InlineToolbar />
                  <SideToolbar />
                </Editor>
              }
            </CardText>
          </Card>
        </Container>
      </div>
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNew)
