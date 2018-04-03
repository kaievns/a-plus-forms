import React from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { NumberInput } from '../../src';

describe('<NumberInput />', () => {
  it('renders a number input', () => {
    const render = mount(<NumberInput layout={null} value={123} />);
    expect(render.html()).to.eql('<input type="number" value="123">');
  });

  it('falls back the value to null', () => {
    const render = mount(<NumberInput layout={null} />);
    expect(render.html()).to.eql('<input type="number" value="">');
  });

  it('feeds back number onChange', () => {
    const onChange = spy();
    const render = mount(<NumberInput onChange={onChange} />);
    render.find('input[type="number"]').simulate('change', {
      target: { value: '12.3' }
    });
    expect(onChange).to.have.been.calledWith(12.3);
  });

  it('trims values good', () => {
    const onChange = spy();
    const render = mount(<NumberInput onChange={onChange} />);
    render.find('input[type="number"]').simulate('change', {
      target: { value: '   123\n\t   ' }
    });
    expect(onChange).to.have.been.calledWith(123);
  });

  it('sends null back if the text is changed to an empty string', () => {
    const onChange = spy();
    const render = mount(<NumberInput onChange={onChange} />);
    render.find('input[type="number"]').simulate('change', {
      target: { value: '' }
    });
    expect(onChange).to.have.been.calledWith(null);
  });

  it('sends null on malformated values', () => {
    const onChange = spy();
    const render = mount(<NumberInput onChange={onChange} />);
    render.find('input[type="number"]').simulate('change', {
      target: { value: 'hack hack hack' }
    });
    expect(onChange).to.have.been.calledWith(null);
  });

  it('understands the `name` prop', () => {
    const render = mount(<NumberInput layout={null} name="qty" />);
    expect(render.html()).to.eql('<input type="number" name="qty" value="">');
  });

  it('understands the `placeholder` prop', () => {
    const render = mount(<NumberInput layout={null} placeholder="Please..." />);
    expect(render.html()).to.eql('<input type="number" placeholder="Please..." value="">');
  });

  it('understands the `disabled` prop', () => {
    const render = mount(<NumberInput layout={null} disabled />);
    expect(render.html()).to.eql('<input type="number" disabled="" value="">');
  });
});
