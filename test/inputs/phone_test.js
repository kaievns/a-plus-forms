import React from 'react';
import { mount } from 'enzyme';
import { PhoneInput } from '../../src';

describe('<PhoneInput />', () => {
  it('renders a phone input', () => {
    const render = mount(<PhoneInput layout={null} value="8675-309" />);
    expect(render.html()).to.eql('<input type="tel" value="8675-309">');
  });

  it('understands the `name` prop', () => {
    const render = mount(<PhoneInput layout={null} name="phone" />);
    expect(render.html()).to.eql('<input type="tel" name="phone" value="">');
  });

  it('understands the `placeholder` prop', () => {
    const render = mount(<PhoneInput layout={null} placeholder="Please..." />);
    expect(render.html()).to.eql('<input type="tel" placeholder="Please..." value="">');
  });

  it('understands the `disabled` prop', () => {
    const render = mount(<PhoneInput layout={null} disabled />);
    expect(render.html()).to.eql('<input type="tel" disabled="" value="">');
  });
});
