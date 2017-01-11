import React = require('react')
import { Link } from 'react-router'
import classnames = require('classnames')
import { linkifyTitle } from './utils'

import HoleEditor from '../editor'
import assert from '../../utils/assert'
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin'
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin'
import { EditorState } from 'draft-js'

import { Serlizer } from '../editor/utils/serializer'

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const sideToolbarPlugin = createSideToolbarPlugin()
const { SideToolbar } = sideToolbarPlugin;
const plugins = [inlineToolbarPlugin, sideToolbarPlugin];

interface ItemProps {
  articleInfo: ArticleModel
  className?: string
}

export default ({articleInfo, className}: ItemProps) => {
  assert(!!articleInfo.title)
  assert(!!articleInfo.content)

  const cls = classnames(
    'h1',
    'bold',
    'mt2',
    'block',
    'article-list-item-title',
    'border-bottom',
    'border-color-primary',
    'text-decoration-none'
  )
  const {title, content, author} = articleInfo
  const href = `@${author}/${linkifyTitle(title)}`

  return (
    <div className={ `article-list-item-wrap ${className || ' '}` }>
      <Link className={ cls } to={ href }>
        { title }
      </Link>
      <div className="article-list-item-paragraph">
        <HoleEditor
          editorState={
            EditorState.createWithContent(Serlizer.deserialize(content))
          }
          plugins={ plugins }>
          <InlineToolbar />
          <SideToolbar />
        </HoleEditor>
      </div>
    </div>
  )
}
