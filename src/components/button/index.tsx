import * as React from 'react';
import * as classNames from 'classnames';

interface IButtonProps extends React.Props<any> {
  onClick?: () => void;
  type?: string;
  className?: string;
  id?: string;
  testid?: string;
  style?: React.CSSProperties
  isvisible?: boolean
};

const defaultStyle: React.CSSProperties = { borderRadius: '4px' }
export default function Button({
  onClick = null,
  type = 'button',
  className = '',
  id = '',
  testid = '',
  children = null,
  style = {},
  isvisible = true
}: IButtonProps) {
  const buttonClasses = classNames('btn', 'bg-black', 'white', className);

  return (
    <button
      data-testid={ testid }
      id={ id }
      type={ type }
      style={ { ...defaultStyle, ...style } }
      className={ buttonClasses }
      onClick={ onClick } >
      { children }
    </button >
  );
}
