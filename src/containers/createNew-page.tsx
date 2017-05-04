import { connect } from 'react-redux'
import * as React from 'react'
import { History } from 'react-router'
import { Map, List, is } from 'immutable'
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin'
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin'
import { ContentState, EditorState } from 'draft-js'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/raisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import KeyboardBackspace
  from 'material-ui/svg-icons/hardware/keyboard-backspace'
import {
  Card, CardActions, CardHeader, CardMedia, CardTitle, CardText
} from 'material-ui/Card'
import Container from '../components/container'
import Transition from '../components/transition'
import Editor from '../components/editor/'
import GoBack from '../widgets/goback'
import { ArticleItem } from '../components/article'

import { update } from '../actions/posts'
import debounce from '../utils/debounce'
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const sideToolbarPlugin = createSideToolbarPlugin()
const { SideToolbar } = sideToolbarPlugin;
const plugins = [inlineToolbarPlugin, sideToolbarPlugin];
interface ICreateNewProps {
  history
  location
  session: Map<any, any>
  updatePost: (id: number | string, content: ContentState) => Promise<any>
  posts
}

interface ICreateNewState {
  saving?: boolean
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    updatePost: (id, content) => dispatch(update(id, content))
  }
}


class CreateNew extends React.PureComponent<ICreateNewProps, ICreateNewState> {
  private currentContent: ContentState
  private prevContent: ContentState
  state = {
    saving: false
  }

  get currentPost() {
    const currentEdit: number = this.props.posts.get('editing')
    if (!currentEdit) {
      throw (`Unexcept Value:${currentEdit}`)
    }

    return (this.props.posts.get('meta') as List<Map<keyof Post<any>, any>>)
      .find(v => v.get('id') === currentEdit)
  }

  getUserInfo() {
    return this.props.session.get('user').toJS()
  }

  diff() {
    return this.currentContent && !is(this.prevContent, this.currentContent)
  }

  save = () => {
    this.setState({ saving: true })
    this.props.updatePost(this.currentPost.get('id'), this.currentContent)
      .then(() => this.setState({ saving: false }))
  }

  autoSave = debounce(this.save, 400)

  onChange = (state: EditorState): void => {
    this.prevContent = this.currentContent
    this.currentContent = state.getCurrentContent()
    if (this.diff()) {
      this.autoSave()
    }
  }

  render() {
    const style = { marginTop: '.3rem' }
    const Save = this.state.saving
      ? <RaisedButton label="正在保存"
        style={ style } secondary onClick={ this.save } />
      : <RaisedButton label="保存"
        style={ style } primary onClick={ this.save } />

    const { avatar, nickName } = this.getUserInfo()

    return <Transition>
      <AppBar
        style={ { position: 'fixed' } }
        title="新建文章"
        titleStyle={ { textAlign: 'center' } }
        iconElementLeft={ <GoBack history={ this.props.history } /> }
        iconElementRight={ Save }
      >
      </AppBar>
      <div className="p4">
        <Container size={ 4 } center>
          <Card>
            <CardHeader
              title={ nickName }
              avatar={ avatar }
            />
            <CardText>
              <Editor plugins={ plugins } onChange={ this.onChange } >
                <Transition><InlineToolbar></InlineToolbar>
                  <SideToolbar></SideToolbar>
                </Transition>
              </Editor>
            </CardText>
          </Card>
        </Container>
      </div>
    </Transition>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNew)
