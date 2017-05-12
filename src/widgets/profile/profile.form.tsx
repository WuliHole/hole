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
const ReduxForm = require('redux-form')

type OptionalField = 'avatar' | 'bio' | 'nickName'
type ProfileFields = OptionalField[]

interface IProfileFormProps {
  handleSubmit: () => void;
  isPending: boolean;
  hasError: boolean;
  profile: User
  fields?: {
    nickName: any;
    bio: any;
    avatar: any
  };
}

interface IProfileFormState {

}

class ProfileForm
  extends React.PureComponent<IProfileFormProps, IProfileFormState> {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      handleSubmit,
      isPending,
      profile,
      fields: { bio, nickName, avatar }
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
            <Avatar src={ profile.avatar } />
          </div>
          <div className="profile-form-nickName inline-block">
            <FormGroup className="profile-field-nickName" >
              <TextField
                name="nickName"
                defaultValue={ profile.nickName }
                underlineShow={ !!nickName.touched }
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
              underlineShow={ !!bio.touched }
              rowsMax={ 4 }
              errorText={
                !!(bio.touched && bio.error)
                && bio.error
              }
            />
          </FormGroup>

          <FormGroup >
            <Button type="submit"
              style={ {
                width: '100%', backgroundColor: '#449bf7', fontWeight: 100
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

  }
}


export default ReduxForm.reduxForm({
  form: 'profile',
  fields: [
    'nickName',
    // 'avatar',
    'bio',
  ] as ProfileFields,
  validate: ProfileForm.validate,
})(ProfileForm)

