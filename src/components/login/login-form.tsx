import * as React from 'react';
const ReduxForm = require('redux-form');

import Form from '../form/';
import FormGroup from '../form/form-group';
import FormLabel from '../form/form-label';
import FormError from '../form/form-error';
import Input from '../form/form-input';
import Button from '../button';
import Alert from '../alert';
import Icon from '../icon'
import * as classnames from 'classnames'
interface ILoginFormProps {
  onSubmit: () => void;
  handleSubmit?: () => void;
  resetForm?: () => void;
  isPending: boolean;
  hasError: boolean;
  fields?: {
    username: any;
    password: any;
  };
};


class LoginForm extends React.Component<ILoginFormProps, {}> {
  render() {
    const {
      handleSubmit,
      resetForm,
      isPending,
      hasError,
      fields: {
        username,
        password
      }
    } = this.props;

    return (
      <Form handleSubmit={ handleSubmit }>
        <FormGroup testid="login-username">
          <Input
            type="text" fieldDefinition={ username }
            id="qa-uname-input"
            className={ classnames({
              'border-color-error': !username.valid,
              'border-color-right': username.valid,
            }) }
            placeholder="用户名" />
          <FormError id="qa-uname-validation"
            isVisible={ !!(username.touched && username.error) }>
            { username.error }
          </FormError>
        </FormGroup>

        <FormGroup testid="login-password">
          <Input type="password"
            fieldDefinition={ password }
            id="qa-password-input"
            className={ classnames({
              'border-color-error': !password.valid,
              'border-color-right': password.valid,
            }) }
            placeholder="密码" />
          <FormError id="qa-password-validation"
            isVisible={ !!(password.touched && password.error) }>
            { password.error }
          </FormError>
        </FormGroup>

        <FormGroup testid="login-submit">
          <Button type="submit"
            style={ {
              width: '100%', backgroundColor: '#449bf7', fontWeight: 100
            } }
            className="block "
            id="qa-login-button"
          >
            登录
          </Button>

        </FormGroup>
      </Form>
    );
  }

  static validate(values) {
    const errors = { username: '', password: '' };

    if (!values.username || !values.username.trim()) {
      errors.username = '用户名不得为空';
    }

    if (!values.password) {
      errors.password = '用户名不得为空';
    }

    if (values.password && values.password.length < 6) {
      errors.password = '密码不得少于6位';
    }

    return errors;
  }
}

export default ReduxForm.reduxForm({
  form: 'login',
  fields: [
    'username',
    'password',
  ],
  validate: LoginForm.validate,
})(LoginForm);
