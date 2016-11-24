import * as React from 'react';
const objectAssign = require('object-assign');
import * as classNames from 'classnames';
const Styles = require('../modal.css');

interface IModalContentProps extends React.Props<any> {
style?: Object
};

export default function ModalContent({
  children = null,
  style = {}
}: IModalContentProps) {
  const classDef = classNames('p2', 'z2', 'bg-white', 'relative',
    Styles.modal);

  return (
    <div style={style} className={ classDef }>
      { children }
    </div>
  );
}
