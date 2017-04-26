import { shallow, mount } from 'enzyme'
import * as React from 'react'
import CommentForm from './index'
import { getContentState } from '../editor/utils/testUtils'
describe('Comment Component', () => {
  let user: User = {
    nickName: 'jacky',
    name: '',
    verified: true,
    id: 22,
    createdAt: '',
    bio: 'nick work',
    avatar: 'http://www.163.com'
  }

  let article = {
    title: 'hello world',
    id: 1,
    authorId: 201,
    createAt: 111,
    author: user,
    updatedAt: '2017-04-13T12:41:17.996Z',
    createdAt: '2017-04-13T12:41:17.996Z',
    content: getContentState('hello world'),
  }

  it('should rightly render user name', () => {

    const comment = mount(
      <CommentForm user={ user }
        article={ article }
        postComment={ (s) => new Promise(void 0) }></CommentForm>
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

