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
});
