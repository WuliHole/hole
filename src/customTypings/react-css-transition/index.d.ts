interface CSSTransitionGroupProps extends React.Props<any> {
  transitionName: string;
  transitionAppear?: boolean;
  transitionAppearTimeout?: number;
  transitionEnter?: boolean;
  transitionEnterTimeout?: number;
  transitionLeave?: boolean;
  transitionLeaveTimeout?: number;
  component?: string
}

declare module 'react-addons-css-transition-group' {
  import React = require('react')



  class CSSTransitionGroup
    extends React.Component<CSSTransitionGroupProps, any> {
  }
  export = CSSTransitionGroup;
}
