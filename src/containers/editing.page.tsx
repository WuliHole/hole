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
  Card, CardActions, CardHeader, CardMedia, CardTitle, CardText,
  Dialog,
  FlatButton,
  TextField
} from 'material-ui'
import Moment = require('moment')
import Container from '../components/container'
import Transition from '../components/transition'
import Editor from '../components/editor/'
import { Serlizer } from '../components/editor/utils/serializer'
import GoBack from '../widgets/goback'
import { ArticleItem } from '../components/article'
import { update, getById, edit, publish } from '../actions/posts'
import debounce from '../utils/debounce'
import './createNew.less'

import { defaultAvatar, default as Avatar } from '../components/avatar/index'
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin'

import { createAutoSavePlugin, AutoSavePlugin } from '../components/editor/plugins/autoSave/autosave.plugin'
import { ImageReader } from '../components/editor/plugins/side-tool-bar/fileReader'
import { createSideToolBarPlugin } from '../components/editor/plugins/side-tool-bar/index'
import { createImagePlugin } from '../components/editor/plugins/image/index'
import createAlignmentPlugin from 'draft-js-alignment-plugin'
import createFocusPlugin from 'draft-js-focus-plugin'
import { composeDecorators } from 'draft-js-plugins-editor'
import { isRejectedAction } from '../actions/utils'
Moment.locale('zh-cn')
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

interface IEditViewProps {
  history
  location
  session: Map<any, any>
  updatePost: (id: number | string, content: ContentState) => Promise<any>
  posts
  getPostById: (pid: number | string) => Promise<any>
  params: { pid: string }
  editPost: typeof edit
  publish: (pid: number | string, tags: string) => Promise<any>
}

interface IEditViewState {
  saving?: boolean
  openPublishWindow?: boolean
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
    editPost: bindActionCreators(edit, dispatch),
    publish: bindActionCreators(publish, dispatch)
  }
}


class EditView extends React.Component<IEditViewProps, IEditViewState> {
  private autoSavePlugin: AutoSavePlugin
  private tags: string

  static contextTypes = {
    displayError: React.PropTypes.func
  }

  state = {
    saving: false,
    openPublishWindow: false
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
    ImageReader.onTaskSuccess = this.save
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
      .then((res) => {
        if (isRejectedAction(res)) {
          this.context.displayError(res.payload.errMsg)
        }
        this.setState({ saving: false })
      })
  }


  render() {
    const style = { marginTop: '.3rem' }
    const Save = this.state.saving
      ? <RaisedButton label="正在保存"
        style={ style } secondary onClick={ this.autoSavePlugin.save } />
      : <RaisedButton label="保存"
        style={ style } primary onClick={ this.autoSavePlugin.save } />

    const { avatar, nickName, bio } = this.getUserInfo()

    const lastSave = this.currentPost && this.currentPost.get('updatedAt')
    const date = new Date(lastSave)

    return <div>
      <AppBar
        style={ { position: 'fixed' } }
        title={ lastSave && `已自动保存到云端 ${Moment(date).fromNow()}` }
        titleStyle={ { textAlign: 'center', color: '#949494', fontSize: '13px' } }
        iconElementLeft={ <GoBack history={ this.props.history } /> }
        iconElementRight={
          <div >
            { this.renderPublishButton() }
            { Save }
          </div>
        }
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
                  autoFocus
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

  renderPublishButton() {
    if (!this.currentPost) {
      return null
    }
    const published = this.currentPost.get('published')
    const style = {
      marginRight: '.3rem'
    }
    const actions = [
      <FlatButton
        label="取消"
        primary={ true }
        onClick={ this.closePublishWindow }
      />,
      <FlatButton
        label="发布"
        primary={ true }
        onClick={ this.publishPost }
      />,
    ]
    return (
      <div className="inline-block">
        <RaisedButton label={ published ? '已发布' : '发布' } style={ style }
          disabled={ published }
          primary
          onClick={ this.openPublishWindow }
        />
        <Dialog
          title="发布此文章"
          actions={ actions }
          modal={ false }
          open={ this.state.openPublishWindow }
          onRequestClose={ this.closePublishWindow }
        >
          <TextField
            style={ { width: '100%' } }
            hintText="添加一些标签(比如编程,生活)"
            onChange={ this.updateTags }
          />
        </Dialog>
      </div>
    )
  }

  updateTags = (e) => {
    this.tags = e.target.value
  }

  publishPost = () => {

    this.props
      .publish(this.currentPost.get('id'), this.tags)
      .then((res) => {
        if (isRejectedAction(res)) {
          this.context.displayError(res.payload.errMsg)
        } else {
          this.closePublishWindow()
        }
      })
  }

  closePublishWindow = () => {
    this.setState({ openPublishWindow: false })
  }

  openPublishWindow = () => {
    this.setState({ openPublishWindow: true })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditView)
