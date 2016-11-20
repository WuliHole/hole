import { shallow, render } from 'enzyme';

import * as React from 'react';

import Logo from './index';

describe('Logo Component', () => {
  it('should create a logo', () => {
    const logo = shallow(<Logo />);
    expect(logo.length).toBe(1);
  });
});

