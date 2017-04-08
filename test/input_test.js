import React from 'react';
import { mount } from 'enzyme';
import Input from '../src/input';

describe('<Input />', () => {
  it('renders a text input', () => {
    const render = mount(<Input layout={null} />);
    expect(render.html()).to.eql('<input type="text" value="">');
  });

  it('allows to set the current value', () => {
    const render = mount(<Input layout={null} value="Nikolay" />);
    expect(render.html()).to.eql('<input type="text" value="Nikolay">');
  });
});
