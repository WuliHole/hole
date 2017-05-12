import * as React from 'react'
import * as classnames from 'classnames'

interface IFormGroupProps extends React.Props<any> {
  testid?: string;
  className?: string
};

export default function FormGroup({
  children = null,
  testid = '',
  className = '',
}: IFormGroupProps) {
  const cls = classnames('py2', className)
  return (
    <div
      data-testid={ testid }
      className={ cls }>
      { children }
    </div>
  );
}
