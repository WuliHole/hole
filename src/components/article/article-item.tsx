import React = require('react')
import { Link } from 'react-router'
import classnames = require('classnames')
import { linkifyTitle } from './utils'
import Icon from '../icon'
import assert from '../../utils/assert'
import { EditorState } from 'draft-js'
import Moment = require('moment')
import Avatar from '../avatar'
import { animated } from '../transition/utils'
import './item.less'

import HoleEditor from '../editor'
import { Serlizer } from '../editor/utils/serializer'
import { createImagePlugin } from '../editor/plugins/image/index'
import createAlignmentPlugin from 'draft-js-alignment-plugin'
import createFocusPlugin from 'draft-js-focus-plugin'
import linkify from 'draft-js-linkify-plugin'
import createCodePlugin from 'app/components/editor/plugins/code-highlight/code-light.plugin'
import { composeDecorators } from 'draft-js-plugins-editor'
import { Affix } from 'react-overlays'

const focusPlugin = createFocusPlugin()
const alignmentPlugin = createAlignmentPlugin()

const decorator = composeDecorators(
  alignmentPlugin.decorator,
  focusPlugin.decorator,
)

const imagePlugin = createImagePlugin({ decorator })
// const { AlignmentTool } = alignmentPlugin

const plugins = [
  focusPlugin,
  alignmentPlugin,
  imagePlugin,
  linkify(),
  createCodePlugin({})
]

interface ItemProps {
  articleInfo: Post<any>
  className?: string
  children?
  maxLength?: number
  rightIcon?: JSX.Element
}

const item = ({
  articleInfo,
  className,
  maxLength,
  children = null,
  rightIcon = null
}: ItemProps) => {
  assert(!!articleInfo.content)

  const cls = classnames(
    'h1',
    'bold',
    'mt2',
    'block',
    'article-list-item-title',
    'text-decoration-none'
  )
  const { title, content, author, id, createdAt } = articleInfo
  const href = `/post/${title}/${id}`
  const date = new Date(createdAt)
  return (

    <div className={ `article-list-item-wrap ${className || ' '}` }>

      <Affix affixClassName="affixed-header" topClassName="static-header" offsetTop={ 125 }>
        <div className="relative" >
          <div className="inline-block left-part-avatar">
            <Link className="inline-block" to={ `/profile/${author.id}` }>
              <Avatar src={ author.avatar } size={ 53 } />
            </Link>
            <div className="inline-block clearfix article-item-usrInfo ml2 pt1 pb1"
              style={ {
                verticalAlign: 'text-bottom'
              } }
            >
              <div>{ author.nickName }</div>
              <div>{ Moment(date, 'YYYYMMDD').fromNow() }</div>
            </div>
          </div>
          <div className="inline-block right-icon">
            { rightIcon }
          </div>
        </div>
      </Affix>
      {/* <Link className={ cls } to={ href }>
        { title }
      </Link> */}
      <div className="article-list-item-paragraph">
        <HoleEditor
          readonly
          editorState={
            EditorState.createWithContent(
              Serlizer.deserialize(
                maxLength ? truncate(content, maxLength) : content
              )
            )
          }
          plugins={ plugins }>
        </HoleEditor>
      </div>
      <span className="mr1"></span>
      {/* <Icon name="like" /> */ }
      { children }
    </div >
  )
}
const AnimatedItem = animated<ItemProps>({ transitionName: 'fadeIn' })(item)
export default AnimatedItem


export function truncate(
  content: any,
  maxLength: number
): any {
  let textLength: number = 0
  let hasTruc: boolean = false

  content.blocks = content.blocks.reduce((acc, block) => {
    if (hasTruc) {
      return acc
    }

    textLength += block.text.length

    if (textLength >= maxLength) {
      block.text = block.text + '......'
      hasTruc = true
    }
    acc.push(block)
    return acc
  }, [])

  return content
}


