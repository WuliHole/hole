import React = require('react')
import Form from '../../components/form/'
import FormGroup from '../../components/form/form-group'
import FormLabel from '../../components/form/form-label'
import FormError from '../../components/form/form-error'
import Input from '../../components/form/form-input'
import Button from '../../components/button'
import Alert from '../../components/alert'
import * as classnames from 'classnames'
const ReduxForm = require('redux-form')

interface IPersonalizationProps extends React.Props<any> {
  onSubmit?: () => void;
  handleSubmit: () => void;
  resetForm?: () => void;
  isPending: boolean;
  hasError: boolean;
  fields?: {
    userName: any;
    bio: any;
  };
};


class Personalization
  extends React.Component<IPersonalizationProps, any> {
  public props: IPersonalizationProps

  constructor(props) {
    super(props)
  }

  render() {
    const {
      handleSubmit,
      resetForm,
      isPending,
      hasError,
      fields: {
        userName,
        bio
      }
    } = this.props


    return (
      <Form handleSubmit={ handleSubmit }>
        <Alert
          testid="alert-loading"
          isVisible={ isPending }>
          正在处理
        </Alert>
        {/*<Alert
          testid="alert-error"
          id="qa-alert"
          isVisible={ hasError }
          status="error">
          <Icon name="jinggao" />Invalid username and password
        </Alert>*/}
        { !isPending &&
          <div>
            <h1 className="center">个性化设置</h1>
            <FormGroup >
              <Input
                type="text" fieldDefinition={ userName }
                id="qa-uname-input"
                className={ classnames({
                  'border-color-error': !userName.valid,
                  'border-color-right': userName.valid,
                }) }
                placeholder="昵称" />
              <FormError
                isVisible={ !!(userName.touched && userName.error) }>
                { userName.error }
              </FormError>
            </FormGroup>

            <FormGroup>
              <Input type="text"
                fieldDefinition={ bio }
                id="qa-password-input"
                className={ classnames({
                  'border-color-error': !bio.valid,
                  'border-color-right': bio.valid,
                }) }
                placeholder="bio" />
              <FormError
                isVisible={
                  !!(bio.touched && bio.error) }
              >
                { bio.error }
              </FormError>
            </FormGroup>

            <FormGroup >

              <Button type="submit"
                style={ {
                  width: '100%', backgroundColor: '#449bf7', fontWeight: 100
                } }
                className="block "
                id="qa-submit-button"
              >
                填好了
          </Button>

            </FormGroup>
          </div>
        }
      </Form>
    );
  }

  static validate(values) {
    const errors = { repeatValidation: '', password: '' };
    // empty
    return errors;
  }
}


export default ReduxForm.reduxForm({
  form: 'personalization',
  fields: [
    'userName',
    'bio',
  ],
  validate: Personalization.validate,
})(Personalization)
