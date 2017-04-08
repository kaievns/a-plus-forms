import React from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { EmailInput } from '../../src';

describe('<EmailInput />', () => {
  it('renders a password input', () => {
    const render = mount(<EmailInput layout={null} value="nikolay@rocks.com" />);
    expect(render.html()).to.eql('<input type="email" value="nikolay@rocks.com">');
  });
});
