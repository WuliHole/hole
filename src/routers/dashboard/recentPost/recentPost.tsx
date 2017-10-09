import React = require('react')
import { Map } from 'immutable'
import Moment = require('moment')
import { List, ListItem } from 'material-ui'
import { getPublished, getDraft, edit } from '../../../actions/posts'
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye'
import DeleteForever from 'material-ui/svg-icons/action/delete-forever'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit'
const Placeholder = require('../../../assets/empty.svg')
import { unique } from '../../../utils/arrayUtils'
import { HistoryBase, } from 'react-router/lib/routerHistory'
import { LocationDescriptor } from 'react-router'
import './recent.less'
import resolveTitleFromContent from 'utils/resolveTitleFromContent'
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
  location: LocationDescriptor
}

export default class RecentPost extends React.Component<RecentPostProps, {}> {

  componentDidMount() {
    this.loadPost(this.props.location.query.public || 'true')
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.query.public !== nextProps.location.query.public) {
      this.loadPost(nextProps.location.query.public)
    }
  }

  loadPost(published: 'true' | 'false') {
    this.props.dispatch(published === 'true' ? getPublished(this.userId) : getDraft(this.userId))
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
    const published = this.props.location.query.public === 'true' ? true : false
    return posts
      ? posts
        .toSet()
        .filter((p: any) => p.get('published') === published)
        .sortBy((p: any) => new Date(p.get('createdAt')))
        .reverse()
        .toJS()
      : []
  }

  visit(p: Post<any>) {
    const title = resolveTitleFromContent(p.content)
    this.props.history.push(`/post/${title}/${p.id}`)
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

  visitPostIfClickedItemContainer = (e, p: Post<any>) => {
    if (e.target.tagName === 'DIV') {
      // clicked item container
      this.visit(p)
    }
  }

  renderPosts() {
    const posts = unique(this.recentPost, p => p.id)

    return posts.map(p => {
      const date = Moment(new Date(p.updatedAt))
        .locale('zh-cn')
        .format('L')
      return <ListItem
        className="recent-item"
        key={ p.createdAt }
        innerDivStyle={ { padding: 8 } }
        primaryText={ resolveTitleFromContent(p.content) }
        onClick={ (e) => this.visitPostIfClickedItemContainer(e, p) }
        secondaryText={ `最后更新 ${date}` }
      >
        <IconMenu
          style={ { position: 'absolute', right: 0 } }
          className="recent-item-icon-menu"
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
