import { shallow, render } from 'enzyme'
import * as React from 'react'
import Avatar from './index'

describe('Avatar Component', () => {
  it('should rightly render Avatar', () => {
    const src = 'http://google.com'
    const node = shallow(
      <Avatar src={ src }></Avatar >
    )
    expect(node.find('img').prop('src')).toEqual(src)
  })
})
