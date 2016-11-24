import * as React from 'react';
import { Modal, ModalContent } from '../modal';
import Button from '../button';
import LoginForm from './login-form';

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
      <ModalContent style={{maxWidth:350}}>
        <Button className="btn-model-close" onClick={onClose}>close</Button>
        <h1 className="mt0">Login</h1>
        <LoginForm
          isPending={ isPending }
          hasError={ hasError }
          onSubmit={ onSubmit } />
        
      </ModalContent>
    </Modal>
  );
}
