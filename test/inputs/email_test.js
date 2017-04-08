import React from 'react';
import { mount } from 'enzyme';
import { EmailInput } from '../../src';

describe('<EmailInput />', () => {
  it('renders a email input', () => {
    const render = mount(<EmailInput layout={null} value="nikolay@rocks.com" />);
    expect(render.html()).to.eql('<input type="email" value="nikolay@rocks.com">');
  });
});
