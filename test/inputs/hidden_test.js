import React from 'react';
import { mount } from 'enzyme';
import { HiddenInput } from '../../src';

describe('<HiddenInput />', () => {
  it('renders a hidden input without a layout', () => {
    const render = mount(<HiddenInput value="item-id" />);
    expect(render.html()).to.eql('<input type="hidden" value="item-id">');
  });
});
