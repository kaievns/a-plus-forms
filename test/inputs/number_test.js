import React from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { NumberInput } from '../../src';

describe('<NumberInput />', () => {
  it('renders a number input', () => {
    const render = mount(<NumberInput layout={null} value={123} />);
    expect(render.html()).to.eql('<input type="number" value="123">');
  });

  it('falls back the value to 0', () => {
    const render = mount(<NumberInput layout={null} />);
    expect(render.html()).to.eql('<input type="number" value="0">');
  });

  it('feeds back number onChange', () => {
    const onChange = spy();
    const render = mount(<NumberInput onChange={onChange} />);
    render.find('input[type="number"]').simulate('change', {
      target: { value: '12.3' }
    });
    expect(onChange).to.have.been.calledWith(12.3);
  });
});
