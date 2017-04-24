import React from 'react';
import { mount } from 'enzyme';
import { Checkbox } from '../../src';

describe('<Checkbox />', () => {
  it('renders great with a label', () => {
    const render = mount(<Checkbox layout={null} label="Are you sure?" />);
    expect(render.html()).to.eql('<label><input type="checkbox"><span>Are you sure?</span></label>');
  });

  it('renders great without a label', () => {
    const render = mount(<Checkbox layout={null} />);
    expect(render.html()).to.eql('<input type="checkbox">');
    expect(render.find('input[type="checkbox"]').props()).to.include({ checked: false });
  });

  it('renders the checkbox checked if value is `true`', () => {
    const render = mount(<Checkbox layout={null} value />);
    expect(render.find('input[type="checkbox"]').props()).to.include({ checked: true });
  });

  it('renders it checked if it has the `checked` property', () => {
    const render = mount(<Checkbox layout={null} checked />);
    expect(render.find('input[type="checkbox"]').props()).to.include({ checked: true });
  });

  it('understands the `name` prop', () => {
    const render = mount(<Checkbox layout={null} name="agreed" />);
    expect(render.html()).to.eql('<input type="checkbox" name="agreed">');
  });

  it('understand the `disabled` prop', () => {
    const render = mount(<Checkbox layout={null} label="Agreed?" disabled />);
    expect(render.html()).to.eql(
      '<label disabled=""><input type="checkbox" disabled=""><span>Agreed?</span></label>'
    );
  });
});
