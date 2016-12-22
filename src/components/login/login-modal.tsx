import * as React from 'react';
import { Modal, ModalContent } from '../modal';
import LoginForm from './login-form';
import Icon from '../icon'
interface ILoginModalProps extends React.Props<any> {
  isVisible: boolean;
  isPending: boolean;
  hasError: boolean;
  onSubmit: () => void;
  onClose: () => void;
};

export default function LoginModal({
  isVisible,
  isPending,
  hasError,
  onSubmit,
  onClose
}: ILoginModalProps) {
  return (
    <Modal isVisible={ isVisible }>
      <ModalContent style={ { maxWidth: 350 } }>
        <Icon
          onClick={ onClose }
          name="guanbi"
          style={ { position: 'absolute', right: '0px' } }
          >
          close
        </Icon>
        <h1 className="mt0 center">Login</h1>
        <LoginForm
          isPending={ isPending }
          hasError={ hasError }
          onSubmit={ onSubmit } />
      </ModalContent>
    </Modal>
  );
}
