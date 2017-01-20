import React = require('react')
import { Link } from 'react-router'
import classnames = require('classnames')
import { linkifyTitle } from './utils'
import Icon from '../icon'
import HoleEditor from '../editor'
import assert from '../../utils/assert'
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin'
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin'
import { EditorState } from 'draft-js'
import Moment = require('moment')
import Avatar from '../avatar'
import './item.less'

import { Serlizer } from '../editor/utils/serializer'
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const sideToolbarPlugin = createSideToolbarPlugin()
const { SideToolbar } = sideToolbarPlugin;
const plugins = [inlineToolbarPlugin, sideToolbarPlugin];

interface ItemProps {
  articleInfo: ArticleModel
  className?: string
  children?
  maxLength?: number
}

export default ({
  articleInfo,
  className,
  maxLength,
  children = null
}: ItemProps) => {
  assert(!!articleInfo.title)
  assert(!!articleInfo.content)

  const cls = classnames(
    'h1',
    'bold',
    'mt2',
    'block',
    'article-list-item-title',
    'text-decoration-none'
  )
  const {title, content, author, id, createAt} = articleInfo
  const href = `/@${author.first}/${linkifyTitle(title)}/${id}`
  const date = new Date(createAt)
  return (

    <div className={ `article-list-item-wrap ${className || ' '}` }>

      <div >
        <div className="">
          <Avatar src={ author.avatar } size={ 53 } />
        </div>
        <div className="clearfix article-item-usrInfo ml4 pt1 pb1">
          <div>{ author.first } { author.last }</div>
          <div>{ Moment(date, 'YYYYMMDD').fromNow() }</div>
        </div>
      </div>

      <Link className={ cls } to={ href }>
        { title }
      </Link>
      <div className="article-list-item-paragraph">
        <HoleEditor
          editorState={
            EditorState.createWithContent(
              Serlizer.deserialize(
                maxLength ? truncateWords(content, maxLength) : content
              )
            )
          }
          plugins={ plugins }>
          <InlineToolbar />
          <SideToolbar />
        </HoleEditor>
      </div>
      <span className="mr1"></span>
      <Icon name="like" />
      { children }
    </div >
  )
}

function truncateWords(
  content: Draft.Model.Encoding.RawDraftContentState,
  maxLength: number
): Draft.Model.Encoding.RawDraftContentState {
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


