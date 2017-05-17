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
import Transition from '../../components/transition/'
import ProfileForm from './profile.form'
import RaisedButton from 'material-ui/RaisedButton'

import './profileWidget.less'
interface IProfileWidgetProps {
  profile: Map<keyof User, any>
  onSave: (formName: string) => any
}

interface IProfileWidgetState {
  readOnly: boolean
}

export default class ProfileWidget
  extends React.Component<IProfileWidgetProps, IProfileWidgetState> {
  state = {
    readOnly: true
  }

  toggleState = () => {
    this.setState({ readOnly: !this.state.readOnly })
  }

  onClick(e) {
    this.toggleState()
  }

  onSubmit = () => {
    this.props.onSave('profile').then(this.toggleState)
  }

  render() {
    const avatar = <Avatar
      size={ 96 }
      src={ this.props.profile.get('avatar') }
      style={ { float: 'right' } }
    />
    const date = new Date(this.props.profile.get('createdAt'))
    const createdAt = Moment(date, 'YYYYMMDD').locale('zh-cn').format('L')
    const editButton = (
      <RaisedButton
        className="profile-submit-button"
        secondary
        onClick={ this.toggleState }
        buttonStyle={ { color: '#fff' } } >
        编辑
      </RaisedButton>
    )


    return (
      <div>
        <CardHeader
          title={ '个人信息' }
          titleStyle={ { fontSize: '2rem' } }
          style={ { padding: '16px 0' } }
          subtitleStyle={
            { fontSize: '0.9rem', width: '90%', margin: '1rem 0' }
          }
          avatar={ editButton }
        >
          <Divider />
        </CardHeader >
        {
          !this.state.readOnly
          &&
          <ProfileForm
            profile={ this.props.profile.toJS() }
            isPending={ false }
            hasError={ false }
            onSubmit={ this.onSubmit }
          />
        }
      </div>
    )
  }
}


