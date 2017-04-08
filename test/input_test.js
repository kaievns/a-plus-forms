import React from 'react';
import { mount } from 'enzyme';
import Input from '../src/input';

describe('<input />', () => {
  it('renders input with decorations', () => {
    const render = mount(<Input name="test" label="Some label" />);
    expect(render.html()).to.eql(
      '<div><label>Some label</label><div><input type="text" value="" name="test"></div></div>'
    );
  });
});
