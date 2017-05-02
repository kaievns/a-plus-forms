import React from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { PasswordInput } from '../../src';

describe('<PasswordInput />', () => {
  it('renders a password input', () => {
    const render = mount(<PasswordInput layout={null} value="secret" />);
    expect(render.html()).to.eql('<input type="password" value="secret">');
  });

  it('understands the `name` prop', () => {
    const render = mount(<PasswordInput layout={null} name="password" />);
    expect(render.html()).to.eql('<input type="password" name="password" value="">');
  });

  it('understands the `placeholder` prop', () => {
    const render = mount(<PasswordInput layout={null} placeholder="Please..." />);
    expect(render.html()).to.eql('<input type="password" placeholder="Please..." value="">');
  });

  it('understands the `disabled` prop', () => {
    const render = mount(<PasswordInput layout={null} disabled />);
    expect(render.html()).to.eql('<input type="password" disabled="" value="">');
  });

  it.skip('does not trim the data', () => {
    const onChange = spy();
    const render = mount(<PasswordInput onChange={onChange} />);
    render.find('input[type="password"]').simulate('change', {
      target: { value: ' asdf ' }
    });
    expect(onChange).to.have.been.calledWith(' asf ');
  });
});
