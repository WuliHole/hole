import { shallow, mount } from 'enzyme'
import * as  React from 'react'
import CommentTable from './commentTable'
import { getContentState } from '../editor/utils/testUtils'


describe('CommentTable Component', () => {
  it('should render 3 comment', () => {
    const user: User = {
      id: 'asdasd',
      first: 'jack',
      last: 'chan',
      avatar: 'http://google.com'
    }

    const comment: IComment = {
      author: user,
      content: getContentState(''),
      date: '201524',
      id: 'jckmks',
    }

    let comment1 = comment
    comment.id = '55555'

    let comment2 = comment
    comment.id = 'ckmlzoo'
    const comments = [
      comment,
      {
        author: user,
        content: getContentState(''),
        date: '2011524',
        id: 'zxccc',
      },
      {
        author: user,
        content: getContentState(''),
        date: '201524',
        id: 'jckccamks',
      }
    ]

    const wrapper = mount(
      <CommentTable comments={ comments } />
    )

    expect(wrapper.find('.comment-user').length).toBe(3)
  })
})
