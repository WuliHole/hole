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


interface ISetPwdFormProps {
  onSubmit?: () => void;
  handleSubmit: () => void;
  resetForm?: () => void;
  isPending: boolean;
  hasError: boolean;
  fields?: {
    password: any;
    repeatValidation: any;
  };
};


class FormPasswordValidation extends React.Component<ISetPwdFormProps, {}> {
  public props: ISetPwdFormProps

  render() {
    const {
      handleSubmit,
      resetForm,
      isPending,
      hasError,
      fields: {
        password,
        repeatValidation
      }
    } = this.props;

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
            <h1 className="center">设置一个新的密码</h1>
            <FormGroup testid="login-username">
              <Input
                type="password" fieldDefinition={ password }
                id="qa-uname-input"
                className={ classnames({
                  'border-color-error': !password.valid,
                  'border-color-right': password.valid,
                }) }
                placeholder="新的密码" />
              <FormError id="qa-password-validation"
                isVisible={ !!(password.touched && password.error) }>
                { password.error }
              </FormError>
            </FormGroup>

            <FormGroup testid="login-password">
              <Input type="password"
                fieldDefinition={ repeatValidation }
                id="qa-password-input"
                className={ classnames({
                  'border-color-error': !repeatValidation.valid,
                  'border-color-right': repeatValidation.valid,
                }) }
                placeholder="再次输入" />
              <FormError id="qa-password-revalidation"
                isVisible={
                  !!(repeatValidation.touched && repeatValidation.error) }
              >
                { repeatValidation.error }
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
                下一步
          </Button>

            </FormGroup>
          </div>
        }
      </Form>
    );
  }

  static validate(values) {
    const errors = { repeatValidation: '', password: '' };

    if (values.password && values.password.length < 6) {
      errors.password = '密码至少为6位';
    }

    if (values.repeatValidation !== values.password) {
      errors.repeatValidation = '两次输入不一致';
    }

    return errors;
  }
}


export default ReduxForm.reduxForm({
  form: 'setPassword',
  fields: [
    'password',
    'repeatValidation',
  ],
  validate: FormPasswordValidation.validate,
})(FormPasswordValidation)
