import * as React from 'react';
import cls = require('classnames')
interface INavigatorProps extends React.Props<any> {
  testid?: string
  isVisible?: boolean
}

export default function Navigator({
  children = null,
  testid = '',
  isVisible = true
}: INavigatorProps) {
  return (
    <nav
      data-testid={ testid }
      className={ cls(
        'flex items-center p1 pl2 pr2 bg-white border-bottom ',
        {
          hide: !isVisible
        })
      }
      id="nav"
    >
      { children }
    </nav>
  );
}
