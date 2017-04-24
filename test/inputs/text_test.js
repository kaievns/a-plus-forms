import React from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { TextInput } from '../../src';

describe('<TextInput />', () => {
  it('renders a text input', () => {
    const render = mount(<TextInput layout={null} />);
    expect(render.html()).to.eql('<input type="text" value="">');
  });

  it('allows to set the current value', () => {
    const render = mount(<TextInput layout={null} value="Nikolay" />);
    expect(render.html()).to.eql('<input type="text" value="Nikolay">');
  });

  it('feeds the onChange events back', () => {
    const onChange = spy();
    const render = mount(<TextInput onChange={onChange} />);
    render.find('input[type="text"]').simulate('change', {
      target: { value: 'new value' }
    });

    expect(onChange).to.have.been.calledWith('new value');
  });

  it('trimms entered text for onChange but keeps it in the input', () => {
    const onChange = spy();
    const render = mount(<TextInput layout={null} onChange={onChange} />);
    render.find('input[type="text"]').simulate('change', {
      target: { value: '   nikolay rocks!   ' }
    });

    expect(onChange).to.have.been.calledWith('nikolay rocks!');
    expect(render.html()).to.eql('<input type="text" value="   nikolay rocks!   ">');
  });

  it('understands the `name` prop', () => {
    const render = mount(<TextInput layout={null} name="username" />);
    expect(render.html()).to.eql('<input type="text" name="username" value="">');
  });

  it('understands the `placeholder` prop', () => {
    const render = mount(<TextInput layout={null} placeholder="Please..." />);
    expect(render.html()).to.eql('<input type="text" placeholder="Please..." value="">');
  });

  it('understands the `disabled` prop', () => {
    const render = mount(<TextInput layout={null} disabled />);
    expect(render.html()).to.eql('<input type="text" disabled="" value="">');
  });
});
