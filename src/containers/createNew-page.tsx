import { connect } from 'react-redux'
import * as React from 'react'
import { History } from 'react-router'
import { Map, List } from 'immutable'
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin'
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
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

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const sideToolbarPlugin = createSideToolbarPlugin()
const { SideToolbar } = sideToolbarPlugin;
const plugins = [inlineToolbarPlugin, sideToolbarPlugin];
interface ICreateNewProps {
  history
  location
  session: Map<any, any>
  updatePost: (id: number | string) => Promise<any>
  posts
}

interface ICreateNewState {

}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    updatePost: (id) => dispatch(update(id))
  }
}


class CreateNew extends React.Component<ICreateNewProps, ICreateNewState> {
  constructor(props) {
    super(props)
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

  updateCurrentPost = (): void => {
    this.props.updatePost(this.currentPost.get('id'))
  }


  render() {
    const Save = <FlatButton label="保存" onClick={ this.updateCurrentPost } />
    const { avatar, nickName } = this.getUserInfo()

    return <Transition>
      <AppBar
        title="新建文章"
        titleStyle={ { textAlign: 'center' } }
        iconElementLeft={ <GoBack history={ this.props.history } /> }
        iconElementRight={ Save }
      >
      </AppBar>
      <div className="p1">
        <Container size={ 4 } center>
          <Card>
            <CardHeader
              title={ nickName }
              avatar={ avatar }
            />
            <CardText>
              <Editor plugins={ plugins } >
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
