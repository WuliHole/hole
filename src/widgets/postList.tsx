import React = require('react')
import Moment = require('moment')
import { EditorState } from 'draft-js'
import { unique } from '../utils/arrayUtils'
import { Serlizer } from '../components/editor/utils/serializer'
import { Link, HistoryBase } from 'react-router'
import { CardHeader, Divider, RaisedButton } from 'material-ui'
import Editor from '../components/editor'
import { truncate } from '../components/article/article-item'
import { createImagePlugin } from '../components/editor/plugins/image/index'
import resolveTitleFromContent from 'utils/resolveTitleFromContent'
import './postList.less'

interface ListProps {
  posts: Post<any>[]
  history: HistoryBase
}

const maxLength = 200
const imagePlugin = createImagePlugin()
const plugins = [
  imagePlugin
]

export default class PostList extends React.Component<ListProps, {}> {

  readPost = (e: React.SyntheticEvent<any>) => {
    e.preventDefault()
    const el = e.currentTarget as HTMLDivElement
    const id = parseInt(el.getAttribute('data-key'), 10)

    if (!id) {
      throw new Error('Unexcept post id ')
    }

    const targetPost = this.props.posts.find(p => p.id === id)
    const title = resolveTitleFromContent(targetPost.content)
    this.props.history.push(`/post/@${title}/${targetPost.id}`)
  }

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

        return <div key={ p.id } className="mt2 mb4 relative post-info">
          <div >
            <span
              className="text-decoration-none black gray "
            >
              { `最后一次更新: ${updated}` }
            </span>
            <h1 onClick={ this.readPost } data-key={ p.id } style={ styles.postContainer } >
              { resolveTitleFromContent(p.content) }
            </h1>
            {/* <RaisedButton primary className="mt2 mb2">
              <Link to={ `/post/@${resolveTitleFromContent(p.content)}/${p.id}` }
                className="text-decoration-none yellow "
              >
                阅读全文
              </Link>
            </RaisedButton > */}
          </div>
          <Divider className="clear" />
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
  },
  postContainer: {
    cursor: 'pointer',
    margin: '10px 0'
  }
}
