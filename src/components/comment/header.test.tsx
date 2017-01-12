import { shallow, mount } from 'enzyme'
import * as  React from 'react'
import { CommentAuthor, CommentAvatar } from './header'
import { getContentState } from '../editor/utils/testUtils'

describe('Header Component', () => {

  it('should render user info', () => {
    const user: User = {
      id: 'asdasd',
      first: 'jack',
      last: 'chan',
      avatar: 'http://google.com'
    }

    const wrapper = mount(
      <CommentAuthor user={ user } />
    )
    expect(wrapper.find('.comment-user').length).toBe(1)
  })

  it('should render user avatar', () => {
    const user: User = {
      id: 'asdasd',
      first: 'jack',
      last: 'chan',
      avatar: 'http://google.com'
    }

    const wrapper = mount(
      <CommentAvatar user={ user } />
    )
    expect(wrapper.find('img').length).toBe(1)
  })
})
