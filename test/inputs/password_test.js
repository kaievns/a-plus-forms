import React from 'react';
import { mount } from 'enzyme';
import { PasswordInput } from '../../src';

describe('<PasswordInput />', () => {
  it('renders a password input', () => {
    const render = mount(<PasswordInput layout={null} value="secret" />);
    expect(render.html()).to.eql('<input type="password" value="secret">');
  });
});
