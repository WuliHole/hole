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
import TextField from 'material-ui/TextField'
import FormGroup from '../../components/form/form-group'
import './profileWidget.less'
interface IProfileWidgetProps {
  profile: Map<keyof User, any>
  onSave: (formName: string) => any
  visitorUid: string
}

interface IProfileWidgetState {

}

export default class ProfileWidget
  extends React.Component<IProfileWidgetProps, IProfileWidgetState> {
  onSubmit = () => {
    this.props.onSave('profile')
  }

  render() {
    const profile = this.props.profile.toJS()
    return (
      <div>
        <CardHeader
          title={ '个人信息' }
          titleStyle={ { fontSize: '2rem' } }
          style={ { padding: '16px 0' } }
          subtitleStyle={
            { fontSize: '0.9rem', width: '90%', margin: '1rem 0' }
          }
        >
          <Divider />
        </CardHeader >
        <ProfileForm
          profile={ profile }
          isPending={ false }
          hasError={ false }
          onSubmit={ this.onSubmit }
        />
      </div>
    )
  }
}


