import React from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { Slider } from '../../src';

describe('<Slider />', () => {
  it('renders a slider component', () => {
    const render = mount(<Slider layout={null} value={2} />);
    expect(render.html()).to.eql('<input type="range" step="1" min="0" max="10" value="2">');
  });

  it('allows to specify custom stepping and range', () => {
    const render = mount(<Slider layout={null} min={0} max={2} step={0.2} />);
    expect(render.html()).to.eql('<input type="range" step="0.2" min="0" max="2" value="0">');
  });

  it('understands the `name` prop', () => {
    const render = mount(<Slider layout={null} name="size" />);
    expect(render.html()).to.eql(
      '<input type="range" step="1" min="0" max="10" name="size" value="0">'
    );
  });

  it('understands the `disabled` prop', () => {
    const render = mount(<Slider layout={null} disabled />);
    expect(render.html()).to.eql(
      '<input type="range" step="1" min="0" max="10" disabled="" value="0">'
    );
  });

  it('spits back numbers as the value changes', () => {
    const onChange = spy();
    const render = mount(<Slider onChange={onChange} />);
    render.find('input[type="range"]').simulate('change', {
      target: { value: '12.3' }
    });
    expect(onChange).to.have.been.calledWith(12.3);
  });
});
