import React = require('react')
import Form from '../../components/form/'
import FormGroup from '../../components/form/form-group'
import FormLabel from '../../components/form/form-label'
import FormError from '../../components/form/form-error'
import Input from '../../components/form/form-input'
import Button from '../../components/button'
import Alert from '../../components/alert'
import * as classnames from 'classnames'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import Avatar from '../../components/avatar'
import { CardHeader } from 'material-ui/Card'
import './profile.form.less'
import { reduxForm, change } from 'redux-form'
import { connect } from 'react-redux'

import {
  default as Uploader,
  filePublicPathGen
} from '../../components/uploader/qiniuUploader'
import { debug } from '../../utils/debug'
type OptionalField = 'avatar' | 'bio' | 'nickName'
type ProfileFields = OptionalField[]

interface IProfileFormProps {
  onSubmit: () => void;
  handleSubmit?: () => void;
  isPending: boolean;
  hasError: boolean;
  profile: User
  readonly?: boolean
  dispatch?
  fields?: {
    nickName: any;
    bio: any;
    avatar: any
  };
}

interface State {
  avatar: string
}

/**
 *  Fix issue: https://github.com/erikras/redux-form/issues/1192
 */
function reduxFormPropsFilter(props) {
  const a = [
    `initialValue`,
    `autofill`,
    `onUpdate`,
    `valid`,
    `invalid`,
    `dirty`,
    `pristine`,
    `active`,
    `touched`,
    `visited`,
    `autofilled`,
    `value`]
  const newProps = {}
  for (let p in props) {
    if (a.indexOf(p) === -1) {
      newProps[p] = props[p]
    }
  }
  return newProps
}


@reduxForm<any, any>({
  form: ProfileForm.formName,
  fields: [
    'nickName',
    'bio',
    'avatar',
  ],
  validate: ProfileForm.validate,
} as any)
export default class ProfileForm
  extends React.PureComponent<IProfileFormProps, State> {
  static formName = 'profile'
  private avatar: string

  constructor(props) {
    super(props)
    this.state = {
      avatar: undefined
    }
  }

  updateAvatarOnUpdateSuccess = (task: UploaderTask) => {
    if (task.result.key) {
      const avatar = filePublicPathGen(task.result.key)
      this.setState({ avatar })
      this.props.dispatch(change(ProfileForm.formName, 'avatar', avatar))
    } else {
      debug(`[Qiniu]:file update failed,current task:\n ${task}`)
    }
  }

  componentWillUnmount() {
    this.setState({ avatar: undefined })
  }

  render() {
    const {
      handleSubmit,
      isPending,
      profile,
      fields: { bio, nickName, avatar },
    } = this.props

    return <div className="ProfileForm" >
      <Form handleSubmit={ handleSubmit }>
        <Alert
          testid="alert-loading"
          isVisible={ isPending }>
          正在处理
        </Alert>
        <div>


          <div className="profile-form-avatar inline-block">
            <Uploader listener={ {
              onTaskSuccess: this.updateAvatarOnUpdateSuccess,
            } }>
              <Avatar src={ this.state.avatar || profile.avatar } />
            </Uploader>
          </div>
          <div className="profile-form-nickName inline-block">
            <FormGroup className="profile-field-nickName" >
              <TextField
                name="nickName"
                id="qa-nickName"
                defaultValue={ profile.nickName }
                underlineShow={ false }
                {...reduxFormPropsFilter(nickName) }
                errorText={
                  !!(nickName.touched && nickName.error)
                  && nickName.error
                }
              />
            </FormGroup>
          </div>
          <Divider className="profile-field-nickName-divider" />

          <FormGroup>
            <div className="label-bio h1">简介</div>
            <TextField
              name="bio"
              defaultValue={ profile.bio }
              fullWidth
              multiLine
              underlineShow={ false }
              rowsMax={ 4 }
              {...reduxFormPropsFilter(bio) }
              errorText={
                !!(bio.touched && bio.error)
                && bio.error
              }
            />
          </FormGroup>
          <FormGroup >
            <Button type="submit"
              style={ {
                width: '88px', backgroundColor: '#000', fontWeight: 100,
              } }
              className="block "
              id="qa-submit-button"
            >
              保存
          </Button>
          </FormGroup>
        </div>
      </Form>
    </div >
  }

  static validate(values) {
    const errors = { nickName: '', bio: '' }
    return errors
  }
}




