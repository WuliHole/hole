import React = require('react')
import { Link } from 'react-router'
import classnames = require('classnames')
import { linkifyTitle } from './utils'
import Editor from '../editor'
import assert from '../../utils/assert'

interface ItemProps {
  articleInfo: ArticleModel
}

export default ({articleInfo}: ItemProps) => {
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
    <div className="article-list-item-wrap ">
      <Link className={ cls } to={ href }>
        { title }
      </Link>
      <div className="article-list-item-paragraph">
        <Editor text={ content }></Editor>
      </div>
    </div>
  )
}
