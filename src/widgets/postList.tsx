import React = require('react')
import Moment = require('moment')
import { EditorState } from 'draft-js'
import { unique } from '../utils/arrayUtils'
import { Serlizer } from '../components/editor/utils/serializer'
import { Link } from 'react-router'
import { CardHeader, Divider } from 'material-ui'
import Editor from '../components/editor'
import { truncate } from '../components/article/article-item'
import { createImagePlugin } from '../components/editor/plugins/image/index'
import resolveTitleFromContent from 'utils/resolveTitleFromContent'
interface ListProps {
  posts: Post<any>[]
}

const maxLength = 200
const imagePlugin = createImagePlugin()
const plugins = [
  imagePlugin
]

export default class PostList extends React.Component<ListProps, {}> {
  render() {
    const { posts } = this.props
    return <section>
      { unique(posts, p => p.id).map(p => {
        const editorState = EditorState.createWithContent(
          Serlizer.deserialize(
            maxLength ? truncate(p.content, maxLength) : p.content
          )
        )

        const created = Moment(new Date(p.createdAt))
          .locale('zh-cn')
          .format('L')

        const updated = Moment(new Date(p.updatedAt))
          .locale('zh-cn')
          .format('L')

        return <div key={ p.id } className="mt2 ">
          <Link to={ `/post/@${resolveTitleFromContent(p.content)}/${p.id}` }>
            <CardHeader
              subtitle={ `最后一次更新: ${updated}` }
              style={ { padding: '16px 0' } }
              subtitleColor={ '#02b875' }
              subtitleStyle={ styles.subTitle }
            >
            </CardHeader>
          </Link>
          <Editor
            plugins={ plugins }
            editorState={ editorState }
            readOnly
          >
            <Link to={ `/post/@${resolveTitleFromContent(p.content)}/${p.id}` } className="text-decoration-none">
              阅读全文
          </Link>
          </Editor>
          <Divider />
        </div>
      })
      }
    </section>
  }
}

const styles = {
  subTitle: {
    fontSize: '0.9rem',
    width: '100%',
    margin: '1rem 0',
  },
  title: {
    width: '100%'
  }
}
