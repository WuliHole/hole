import React = require('react')
import { Map } from 'immutable'
import Moment = require('moment')
import { List, ListItem } from 'material-ui'
import { getUserPosts } from '../../../actions/posts'
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye'
import './recent.less'
import { HistoryBase } from 'react-router/lib/routerHistory'
interface RecentPostProps {
  posts: Map<number, Post<any>>
  session
  dispatch
  history: HistoryBase
}

export default class RecentPost extends React.Component<RecentPostProps, void> {

  componentDidMount() {
    if (!this.groupedPostsByAuthorId.get(this.userId)) {
      this.props.dispatch(getUserPosts(this.userId))
    }
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
    return <div className="recentPost" >
      <List>
        {
          this.recentPost.map(p => {
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
      </List>
    </div>
  }
}
