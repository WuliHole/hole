import * as React from 'react';
import { Modal, ModalContent } from '../modal';
import LoginForm from './login-form';
import SignUpForm from './reg-form'
import Icon from '../icon'

interface ILoginModalProps extends React.Props<any> {
  isVisible: boolean;
  isPending: boolean;
  hasError: boolean;
  signup: () => void;
  login: () => void;
  onClose: () => void;
};

enum Panel {
  login,
  singup
}


export default class LoginModal extends React.Component<ILoginModalProps, any> {
  state = {
    currentPanel: Panel.login
  }

  switchPanel = (panelType: number) => {
    this.setState({ currentPanel: panelType })
  }

  showSignUpForm = () => {
    this.switchPanel(Panel.singup)
  }

  render() {
    const {
      isPending,
      isVisible,
      onClose,
      login,
      signup,
      hasError
    } = this.props

    return (
      <Modal isVisible={ isVisible } >

        <ModalContent style={ { maxWidth: 783 } } >
          <Icon
            onClick={ onClose }
            name="guanbi"
            style={ { position: 'absolute', right: '0px' } }
            >
          </Icon>
          <div style={ { padding: '7rem' } }>
            <div style={ {
              width: '80%',
              margin: '0 auto'
            } }>

              {
                this.state.currentPanel === Panel.login
                && <LoginForm
                  isPending={ isPending }
                  hasError={ hasError }
                  onSubmit={ login } />
              }

              {
                this.state.currentPanel === Panel.login
                &&
                < div className="h6">
                  没有帐号?
                    <a onClick={ this.showSignUpForm }
                    href="javascript:void(0)"
                    className="singup text-decoration-none">注册
                  </a>
                </div>
              }
              {
                this.state.currentPanel === Panel.singup
                && <SignUpForm
                  isPending={ isPending }
                  hasError={ hasError }
                  onSubmit={ signup } />
              }
            </div>
          </div >
        </ModalContent>
      </Modal >
    );
  }
}
