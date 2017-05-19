import { shallow, render } from 'enzyme';

import * as React from 'react';

import Uploader from './qiniuUploader';

describe('Uploader Component', () => {
  it('should respond click events', () => {
    const onButtonClick = jasmine.createSpy('onButtonClick');
    const wrapper = shallow(<Uploader onClick={ onButtonClick } />);
    const container = wrapper.find('.Uploader');
    container.simulate('click')
    expect(container.length).toBe(1);
    expect(onButtonClick).toHaveBeenCalled()
  })

  it('should render child', () => {
    const wrapper = shallow(<Uploader>
      <div className="test"></div>
    </Uploader>);
    const container = wrapper.find('.test');
    expect(container.length).toBe(1)
  })
})

