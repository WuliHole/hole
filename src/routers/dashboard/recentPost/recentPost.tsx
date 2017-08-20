import React = require('react')
import { Map } from 'immutable'
import Moment = require('moment')
import { List, ListItem } from 'material-ui'
import { getUserPosts, edit } from '../../../actions/posts'
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye'
import DeleteForever from 'material-ui/svg-icons/action/delete-forever'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit'
const Placeholder = require('../../../assets/empty.svg')
import { unique } from '../../../utils/arrayUtils'
import { HistoryBase } from 'react-router/lib/routerHistory'
import './recent.less'

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
interface RecentPostProps {
  posts: Map<number, Post<any>>
  session
  dispatch
  history: HistoryBase
  renderCreatePostButton: (text?: string) => JSX.Element
  edit: (p: Post<any>) => void
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

  visit(p: Post<any>) {
    this.props.history.push(`/post/${p.title}/${p.id}`)
  }

  edit(p: Post<any>) {
    this.props.edit(p)
    this.props.history.push(`/post/${p.id}/edit`)
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
    const posts = unique(this.recentPost, p => p.id)

    return posts.map(p => {
      const date = Moment(new Date(p.createdAt))
        .locale('zh-cn')
        .format('L')
      return <ListItem
        className="recent-item"
        key={ p.createdAt }
        primaryText={ p.title }
        secondaryText={ date }
      >
        <IconMenu
          style={ { position: 'absolute', right: 0 } }
          iconButtonElement={ <IconButton><MoreVertIcon /></IconButton> }
        >
          <MenuItem primaryText="编辑" onClick={ () => this.edit(p) } leftIcon={ <ModeEdit /> } />
          <MenuItem primaryText="预览" onClick={ () => this.visit(p) } leftIcon={ <RemoveRedEye /> } />
          <MenuItem primaryText="删除" leftIcon={ <DeleteForever /> } />
        </IconMenu>
      </ListItem>
    })
  }
}
