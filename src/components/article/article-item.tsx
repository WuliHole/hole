import React = require('react')

interface ItemProps {
  title: string
  content: string
}

export default ({title, content}: ItemProps) => {
  return (
    <div className="article-list-item-wrap">
      <h2 className={
        'article-list-item-title border-bottom border-color-primary'
      }
        >
        { title }
      </h2>
      <p className="article-list-item-paragraph">{ content }</p>
    </div>
  )
}
