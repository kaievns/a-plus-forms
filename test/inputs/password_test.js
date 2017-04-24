import React from 'react';
import { mount } from 'enzyme';
import { PasswordInput } from '../../src';

describe('<PasswordInput />', () => {
  it('renders a password input', () => {
    const render = mount(<PasswordInput layout={null} value="secret" />);
    expect(render.html()).to.eql('<input type="password" value="secret">');
  });

  it('understands the `name` prop', () => {
    const render = mount(<PasswordInput layout={null} name="password" />);
    expect(render.html()).to.eql('<input type="password" name="password" value="">');
  });

  it('understands the `placeholder` prop', () => {
    const render = mount(<PasswordInput layout={null} placeholder="Please..." />);
    expect(render.html()).to.eql('<input type="password" placeholder="Please..." value="">');
  });

  it('understands the `disabled` prop', () => {
    const render = mount(<PasswordInput layout={null} disabled />);
    expect(render.html()).to.eql('<input type="password" disabled="" value="">');
  });
});
