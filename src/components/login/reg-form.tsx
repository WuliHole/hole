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

interface ISignUpFormProps {
  onSubmit: () => void;
  handleSubmit?: () => void;
  resetForm?: () => void;
  isPending: boolean;
  hasError: boolean;
  fields?: {
    email: any
  };
};


class SignUpForm extends React.Component<ISignUpFormProps, {}> {
  render() {
    const {
      handleSubmit,
      resetForm,
      isPending,
      hasError,
      fields: {
        email
      }
    } = this.props;

    return (
      <Form handleSubmit={ handleSubmit }>
        <FormGroup testid="signup-username">
          <Input
            type="text" fieldDefinition={ email }
            id="qa-uname-input"
            className={ classnames({
              'border-color-error': !email.valid,
              'border-color-right': email.valid,
            }) }
            placeholder="邮箱" />
          <FormError id="qa-uname-validation"
            isVisible={ !!(email.touched && email.error) }>
            { email.error }
          </FormError>
        </FormGroup>

        <FormGroup testid="signup-submit">
          <Button type="submit"
            style={ {
              width: '100%',
              fontWeight: 100
            } }
            className="block "
            id="qa-signup-button"
          >
            发送验证邮件
          </Button>
        </FormGroup>
      </Form>
    );
  }

  static validate(values) {
    const errors = { email: '' };

    if (!validateEmail(values.email)) {
      errors.email = '不正确的邮箱地址'
    }

    return errors;
  }
}

function validateEmail(email) {
  /* tslint:disable */
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

/* tslint:enable */
export default ReduxForm.reduxForm({
  form: 'signup',
  fields: [
    'email'
  ],
  validate: SignUpForm.validate,
})(SignUpForm);
