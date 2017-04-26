import { shallow, mount } from 'enzyme'
import * as  React from 'react'
import { CommentAuthor, CommentAvatar } from './header'
import { getContentState } from '../editor/utils/testUtils'

describe('Header Component', () => {
  const user: User = {
    id: 1111,
    name: 'jack',
    nickName: '5555',
    createdAt: '',
    verified: false,
    bio: 'pppp',
    avatar: 'http://google.com'
  }
  it('should render user info', () => {


    const wrapper = mount(
      <CommentAuthor user={ user } />
    )
    expect(wrapper.find('.comment-user').length).toBe(1)
  })

  it('should render user avatar', () => {
    const wrapper = mount(
      <CommentAvatar user={ user } />
    )
    expect(wrapper.find('img').length).toBe(1)
  })
})
