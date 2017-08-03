import React = require('react')
import Moment = require('moment')
import { EditorState } from 'draft-js'
import { unique } from '../utils/arrayUtils'
import { Serlizer } from '../components/editor/utils/serializer'
import { Link } from 'react-router'
import { CardHeader, Divider } from 'material-ui'
import Editor from '../components/editor'

interface ListProps {
  posts: Post<any>[]
}

export default class PostList extends React.Component<ListProps, void> {
  render() {
    const { posts } = this.props
    return <section>
      { unique(posts, p => p.id).map(p => {
        const contentState = Serlizer.deserialize(p.content)
        return <div key={ p.id } className="mt2 mb2">
          <Link to={ `/post/${p.title}/${p.id}` }>
            <CardHeader
              title={ p.title }
              titleStyle={ { fontSize: '2rem' } }
              subtitle={ Moment(new Date(p.createdAt))
                .locale('zh-cn')
                .format('L') }
              style={ { padding: '16px 0' } }
              subtitleStyle={
                { fontSize: '0.9rem', width: '90%', margin: '1rem 0' }
              }
            >
            </CardHeader>
          </Link>
          <Editor
            editorState={
              EditorState.createWithContent(contentState)
            }
            readOnly
          />
          <Divider />
        </div>
      })
      }
    </section>
  }
}
