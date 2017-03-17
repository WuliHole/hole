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

// Making this a class-based component until redux-form typings support
// stateless functional components.
class SignUpForm extends React.Component<ISignUpFormProps, void> {
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
        <Alert
          testid="alert-loading"
          isVisible={ isPending }>
          正在发送验证邮件
        </Alert>
        { email.touched &&
          <Alert
            testid="alert-error"
            id="qa-alert"
            isVisible={ hasError }
            status="error">
            <Icon name="jinggao" />邮箱已注册
        </Alert>
        }

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
              width: '100%', backgroundColor: '#449bf7', fontWeight: 100
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