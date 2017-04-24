import React from 'react';
import { mount } from 'enzyme';
import { EmailInput } from '../../src';

describe('<EmailInput />', () => {
  it('renders a email input', () => {
    const render = mount(<EmailInput layout={null} value="nikolay@rocks.com" />);
    expect(render.html()).to.eql('<input type="email" value="nikolay@rocks.com">');
  });

  it('understands the `name` prop', () => {
    const render = mount(<EmailInput layout={null} name="email" />);
    expect(render.html()).to.eql('<input type="email" name="email" value="">');
  });

  it('understands the `placeholder` prop', () => {
    const render = mount(<EmailInput layout={null} placeholder="Please..." />);
    expect(render.html()).to.eql('<input type="email" placeholder="Please..." value="">');
  });

  it('understands the `disabled` prop', () => {
    const render = mount(<EmailInput layout={null} disabled />);
    expect(render.html()).to.eql('<input type="email" disabled="" value="">');
  });
});
