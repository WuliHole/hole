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

    const profile = this.props.profile.toJS()
    const disableStyle = this.state.readOnly
      ? {
        cursor: 'default',
        color: 'rgba(0,0,0,0.87)'
      }
      : {}
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
            profile={ profile }
            isPending={ false }
            hasError={ false }
            onSubmit={ this.onSubmit }
          />
        }{
          this.state.readOnly
          &&
          <div className="ProfileForm">
            <div className="profile-form-avatar inline-block">
              <Avatar src={ profile.avatar } />
            </div>
            <div className="profile-form-nickName inline-block">
              <FormGroup className="profile-field-nickName" >
                <TextField
                  inputStyle={ disableStyle }
                  disabled
                  underlineShow={ false }
                  name="nickName"
                  id="qa-nickName"
                  defaultValue={ profile.nickName }
                />
              </FormGroup>
            </div>
            <Divider className="profile-field-nickName-divider" />
            <FormGroup>
              <div className="label-bio h1">简介</div>
              <TextField
                disabled
                textareaStyle={ disableStyle }
                name="bio"
                underlineShow={ false }
                defaultValue={ profile.bio }
                fullWidth
                multiLine
                rowsMax={ 4 }
              />
            </FormGroup>
          </div>
        }
      </div>
    )
  }
}


