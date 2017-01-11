import { shallow, render } from 'enzyme'
import * as React from 'react'
import Comment from './index'
import { getContentState } from '../editor/utils/testUtils'
describe('Comment Component', () => {
  let user: User = {
    first: 'jacky',
    last: 'chan',
    id: 2,
    avatar: 'http://www.163.com'
  }

  let article: ArticleModel
  article = {
    id: 1,
    title: 'give me a ball',
    content: getContentState('hello world'),
    createAt: '2017-1-10',
    author: 'jacky chan'
  }

  it('should rightly render user name', () => {

    const comment = shallow(
      <Comment user={ user } article={ article }></Comment>
    )
    expect(comment.find('.comment-user').text()).toEqual(article.author)
  })

  it('should render avatar', () => {
    const comment = render(
      <Comment user={ user } article={ article }></Comment>
    )
    expect(comment.find('img').length).toEqual(1)
  })
})

