import { shallow, mount } from 'enzyme'
import * as  React from 'react'
import CommentRow from './commentRow'
import { getContentState } from '../editor/utils/testUtils'

describe('CommentRow Component', () => {
  it('should render user info', () => {
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
    const wrapper = mount(
      <CommentRow comment={ comment } />
    )
    expect(wrapper.find('.comment-user').length).toBe(1)

  })
})
