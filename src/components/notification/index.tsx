import React = require('react')
import { RaisedButton, IconButton, Popover, Badge, List, ListItem, CircularProgress, Divider, Subheader } from 'material-ui'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import { darkBlack } from 'material-ui/styles/colors'
import resolveTitleFromContent from 'utils/resolveTitleFromContent'
import Moment = require('moment')
interface Props {
  unread: number
  notifications: NotificationEntity[]
  clearUnread: () => any
  isLoading: boolean
}

interface State {
  open?: boolean
  anchorEl?: any
}



export default class NotificationBox extends React.Component<Props, State> {

  state = {
    open: false,
    anchorEl: null
  }

  ref = el => this.setState({ anchorEl: el })

  handleTouchTap = (event) => {
    event.preventDefault();
    this.setState({
      open: true,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
    this.props.clearUnread()
  };

  render() {
    return (
      <div className="inline-block" >
        <div className="inline-block" ref={ this.ref }>
          <IconButton tooltip="Notifications" >
            <NotificationsIcon onClick={ this.handleTouchTap }
            />
          </IconButton>
        </div>
        {
          this.props.unread !== null &&
          this.props.unread > 0 &&
          <Badge
            badgeContent={ this.props.unread || 0 }
            secondary={ true }
            badgeStyle={ { top: 12, right: 12 } }
            style={ { top: -10, left: -15 } }
          />
        }
        <Popover
          open={ this.state.open }
          anchorEl={ this.state.anchorEl }
          style={ { width: 368 } }
          className="trangle"
          anchorOrigin={ { horizontal: 'middle', vertical: 'bottom' } }
          targetOrigin={ { horizontal: 'right', vertical: 'top' } }
          onRequestClose={ this.handleRequestClose }
        >
          { this.props.isLoading && <CircularProgress /> }
          { this.renderItems() }
        </Popover>
      </div>
    );
  }
  renderItems() {
    const len = this.props.notifications.length
    if (len === 0) {
      return null
    }

    return <div>
      { this.props.notifications.map((r, index) => {
        const date = Moment(new Date(r.created_at))
          .locale('zh-cn')
          .format('L')
        return <List key={ r.id }>
          <Subheader>{ date }</Subheader>
          {
            r.activities.map(activity => {
              const description = this.getDescription(activity)
              return <div key={ activity.id }>
                <ListItem
                  primaryText={ description }
                />
              </div>
            })
          }
          { index !== len - 1 && <Divider /> }
        </List>
      })
      }

    </div>
  }

  getDescription(activity: Activity) {
    switch (activity.verb) {
      case 'comment':
        return `${activity.actorNickname}${verbMap.comment}${activity.postTitle}`
      default:
        throw new TypeError('Uknow activity type')
    }
  }
}

export const verbMap = {
  comment: '评论了你的文章'
}