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

  it('trimms entered text for onChange but keeps it in the input', () => {
    const onChange = spy();
    const render = mount(<Textarea layout={null} onChange={onChange} />);
    render.find('textarea').simulate('change', {
      target: { value: '   nikolay rocks!   ' }
    });

    expect(onChange).to.have.been.calledWith('nikolay rocks!');
    expect(render.html()).to.eql('<textarea>   nikolay rocks!   </textarea>');
  });
});
