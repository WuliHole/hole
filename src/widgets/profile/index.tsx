import * as React from 'react'
import Moment = require('moment')
import Divider from 'material-ui/Divider'
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import { Map } from 'immutable'
import Avatar from '../../components/avatar'

interface IProfileWidgetProps {
  profile: Map<keyof User, any>
  onSave: () => any
}
interface IProfileWidgetState {
  readOnly: boolean
}

export default class ProfileWidget
  extends React.PureComponent<IProfileWidgetProps, IProfileWidgetState> {
  state = {
    readOnly: true
  }

  toggleState() {
    this.setState({ readOnly: !this.state.readOnly })
  }

  render() {
    const avatar = <Avatar
      size={ 96 }
      src={ this.props.profile.get('avatar') }
      style={ { float: 'right' } }
    />
    const date = new Date(this.props.profile.get('createdAt'))
    const createdAt = Moment(date, 'YYYYMMDD').locale('zh-cn').format('L')

    return (
      <CardHeader
        title={ this.props.profile.get('nickName') }
        titleStyle={ { fontSize: '2rem' } }
        subtitle={ this.props.profile.get('bio') }
        style={ { padding: '16px 0' } }
        subtitleStyle={ { fontSize: '0.9rem', width: '90%', margin: '1rem 0' } }
        avatar={ avatar }
      >
        <span className="block"
          style={ { fontSize: '.9rem', lineHeight: '2rem' } }
        >
          加入日期:{ createdAt }
        </span>
        <Divider />
      </CardHeader>
    )
  }
}
