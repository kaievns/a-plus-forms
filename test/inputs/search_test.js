import React from 'react';
import { mount } from 'enzyme';
import { SearchInput } from '../../src';

describe('<SearchInput />', () => {
  it('renders a search input', () => {
    const render = mount(<SearchInput layout={null} value="nikolay@rocks.com" />);
    expect(render.html()).to.eql('<input type="search" value="nikolay@rocks.com">');
  });

  it('understands the `name` prop', () => {
    const render = mount(<SearchInput layout={null} name="search" />);
    expect(render.html()).to.eql('<input type="search" name="search" value="">');
  });

  it('understands the `placeholder` prop', () => {
    const render = mount(<SearchInput layout={null} placeholder="Please..." />);
    expect(render.html()).to.eql('<input type="search" placeholder="Please..." value="">');
  });

  it('understands the `disabled` prop', () => {
    const render = mount(<SearchInput layout={null} disabled />);
    expect(render.html()).to.eql('<input type="search" disabled="" value="">');
  });
});
