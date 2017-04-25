import React from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { Form } from '../../src';

describe('<Form />', () => {
  it('renders a `form`', () => {
    const render = mount(<Form />);
    expect(render.html()).to.eql('<form novalidate=""></form>');
  });

  it('calls the onSubmit when the form is submitted', () => {
    const onSubmit = spy();
    const render = mount(<Form onSubmit={onSubmit} />);
    render.find('form').simulate('submit');
    expect(onSubmit).to.have.been.calledWith({});
  });
});
