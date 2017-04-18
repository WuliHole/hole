import { connect } from 'react-redux'
import * as React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress';
import KeyboardBackspace
  from 'material-ui/svg-icons/hardware/keyboard-backspace'
import { History } from 'react-router'
import Editor from '../components/editor/'
import { Map } from 'immutable'
import {
  Card, CardActions, CardHeader, CardMedia, CardTitle, CardText
} from 'material-ui/Card';
import Container from '../components/container'
import Transition from '../components/transition'
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin'
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin'

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const sideToolbarPlugin = createSideToolbarPlugin()
const { SideToolbar } = sideToolbarPlugin;
const plugins = [inlineToolbarPlugin, sideToolbarPlugin];
import { ArticleItem } from '../components/article'
interface ICreateNewProps {
  history
  location
  session: Map<any, any>
}

interface ICreateNewState {

}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps() {
  return {

  }
}


class CreateNew extends React.Component<ICreateNewProps, ICreateNewState> {
  constructor(props) {
    super(props)
  }

  goBack = () => {
    this.props.history.goBack()
  }

  getUserInfo() {
    return this.props.session.get('user').toJS()
  }

  render() {
    const Save = <FlatButton label="保存" />
    const { avatar, nickName } = this.getUserInfo()

    return <Transition>
      <AppBar
        title="新建文章"
        titleStyle={ { textAlign: 'center' } }
        iconElementLeft={
          <IconButton onClick={ this.goBack }>
            <KeyboardBackspace />
          </IconButton>
        }
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
