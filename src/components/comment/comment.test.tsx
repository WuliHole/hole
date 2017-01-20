import { shallow, mount } from 'enzyme'
import * as React from 'react'
import CommentForm from './index'
import { getContentState } from '../editor/utils/testUtils'
describe('Comment Component', () => {
  let user: User = {
    first: 'jacky',
    last: 'chan',
    id: '2',
    avatar: 'http://www.163.com'
  }

  let article: ArticleModel
  article = {
    id: 1,
    title: 'give me a ball',
    content: getContentState('hello world'),
    createAt: '2017-1-10',
    author: user
  }

  it('should rightly render user name', () => {

    const comment = mount(
      <CommentForm user={ user }
        article={ article }
        postComment={ (s) => new Promise(void 0) }></CommentForm>
    )
    expect(comment.find('.comment-user').text()).toEqual(
      `${article.author.first} ${article.author.last}`
    )
  })

  it('should render avatar', () => {
    const comment = mount(
      <CommentForm user={ user }
        postComment={ (s) => new Promise(void 0) }
        article={ article }></CommentForm>
    )
    expect(comment.find('img').length).toEqual(1)
  })
})

