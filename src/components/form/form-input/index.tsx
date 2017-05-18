import * as React from 'react';

interface IFieldDefinition {
  value?: string;
  onBlur?: () => void;
  onChange?: () => void;
  onFocus?: () => void;
  name?: string
}

interface IInputProps extends React.Props<any> {
  fieldDefinition?: IFieldDefinition;
  type?: string;
  placeholder?: string;
  id?: string;
  className?: string
};

export default function Input({
  type = 'text',
  placeholder = '',
  fieldDefinition = {} as IFieldDefinition,
  id = '',
  className = '',
}) {
  const {
    value,
    onBlur,
    onChange,
    onFocus,
    name
  } = fieldDefinition;

  return (
    <input
      name={ name }
      id={ id }
      className={ `block col-12 mb1 input ${className}` }
      type={ type }
      placeholder={ placeholder }
      defaultValue={ value }
      onBlur={ onBlur }
      onChange={ onChange }
      onFocus={ onFocus } />
  );
}
