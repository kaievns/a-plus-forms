import React from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { Textarea } from '../../src';

describe('<Textarea />', () => {
  it('renders a text input', () => {
    const render = mount(<Textarea layout={null} />);
    expect(render.html()).to.eql('<textarea></textarea>');
  });

  it('allows to set the current value', () => {
    const render = mount(<Textarea layout={null} value="Nikolay" />);
    expect(render.html()).to.eql('<textarea>Nikolay</textarea>');
  });

  it('feeds the onChange events back', () => {
    const onChange = spy();
    const render = mount(<Textarea onChange={onChange} />);
    render.find('textarea').simulate('change', {
      target: { value: 'new value' }
    });

    expect(onChange).to.have.been.calledWith('new value');
  });
});
