import Transition from './index'
import { Component } from 'react'
import React = require('react')
/* tslint:disable */

/**
 *  AnimateDecorator base on https://facebook.github.io/react/docs/animation.html
 *
 *
 * example:       you can see also components/article/article-item.tsx
 *   type PropsOfYourChildComponent= {
 *                                     color:string
 *                                   }
 *             ES5
 * --------------------------------------------------------------------------------
 *   -setup transition options
 *   const dec = animated<PropsOfYourChildComponent>({ transitionName: 'fadeIn' })
 *
 *   - create a JSX Element
 *   const Board = <div></div>
 *
 *   - now you got a  animated component
 *   const AnimatedBoard = dec(Board)
 *
 *   - render it
 *   <AnimatedBoard color='#fff'></AnimatedBoard>
 *---------------------------------------------------------------------------------
 *             ES6
 * --------------------------------------------------------------------------------
 *
 *   - setup transition options   use the sugar "@"
 *
 *     @animated<PropsOfYourChildComponent>({ transitionName: 'fadeIn' })
 *     export class C extends Component<PropsOfYourChildComponent, any> {
 *       render() {
 *         const color = this.props.color
 *         return <div style={{color}}></div>
 *       }
 *     }
 *
 *   - render it
 *   <AnimatedBoard color='#fff'></AnimatedBoard>
 */

/* tslint:enable */

type AnimatDecorator = <P>(opts: CSSTransitionGroupProps) =>
  (components) => typeof Component

export const animated = function <P>(animatedOptions: CSSTransitionGroupProps) {
  return function (ChildComponent: any) {
    return class Animated extends Component<P, any> {
      constructor(props) {
        super(props)
      }
      render() {
        const props = this.props

        return < Transition >
          <ChildComponent {...this.props as any} />
        </Transition >
      }
    }
  }
}



