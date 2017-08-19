import React = require('react')
import { Map } from 'immutable'
import Moment = require('moment')
import { List, ListItem } from 'material-ui'
import { getUserPosts } from '../../../actions/posts'
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye'
const Placeholder = require('../../../assets/empty.svg')

import { HistoryBase } from 'react-router/lib/routerHistory'
import './recent.less'
interface RecentPostProps {
  posts: Map<number, Post<any>>
  session
  dispatch
  history: HistoryBase
  renderCreatePostButton: (text?: string) => JSX.Element
}

export default class RecentPost extends React.Component<RecentPostProps, void> {

  componentDidMount() {
    this.props.dispatch(getUserPosts(this.userId))
  }

  get userId() {
    return this.props.session.getIn(['user', 'id'])
  }

  get groupedPostsByAuthorId() {
    return this.props.posts
      .groupBy((p: any, index) => p.get('authorId'))
  }

  get recentPost(): Post<any>[] {
    const id = parseInt(this.userId, 10)
    const posts = this.groupedPostsByAuthorId.get(this.userId)
    return posts
      ? posts
        .toSet()
        .sortBy((p: any) => new Date(p.get('createdAt')))
        .reverse()
        .toJS()
      : []
  }

  seek(p: Post<any>) {
    this.props.history.push(`/post/${p.title}/${p.id}`)
  }

  render() {
    const length = this.recentPost.length

    return <div className="recentPost" >
      <List>
        {
          length === 0
            ? this.renderPlaceholder()
            : this.renderPosts()
        }
      </List>
    </div>
  }

  renderPlaceholder() {
    return <div className="empty-list center">
      <img src={ Placeholder } style={ { width: 64 } } className="inline-block" />
      <span className="block mb2 mt2">找遍了这个星球都没有找到你写过的文章</span>
      { this.props.renderCreatePostButton('写一篇') }
    </div>
  }

  renderPosts() {
    return this.recentPost.map(p => {
      const date = Moment(new Date(p.createdAt))
        .locale('zh-cn')
        .format('L')
      return <ListItem
        className="recent-item"
        onClick={ () => this.seek(p) }
        key={ p.createdAt }
        primaryText={ p.title }
        secondaryText={ date }
        rightIcon={ <RemoveRedEye /> }
      />
    })
  }
}
