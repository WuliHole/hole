import * as React from 'react';
import * as classNames from 'classnames';

interface IContainerProps extends React.Props<any> {
  size: number;
  center: boolean;
  testid?: string;
  style?: React.CSSProperties
  className?: string
};

export default function Container({
  size = 1,
  center = false,
  children = null,
  testid = '',
  style = {},
  className = ''
}: IContainerProps) {
  const containerClasses = classNames('clearfix', 'bg-white', {
    'max-width-1': size === 1,
    'max-width-2': size === 2,
    'max-width-3': size === 3,
    'max-width-4': size === 4,
    'mx-auto': center,
  });

  return (
    <div data-testid={ testid } style={ style }
      className={ containerClasses + ' ' + className }>
      { children }
    </div>
  );
}
