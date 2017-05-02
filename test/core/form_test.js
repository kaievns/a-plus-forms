import React from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { Form, TextInput, PasswordInput } from '../../src';

describe('<Form />', () => {
  it('renders a `form`', () => {
    const render = mount(<Form />);
    expect(render.html()).to.eql('<form novalidate=""></form>');
  });

  it('sends the form data into onSubmit hook', () => {
    const onSubmit = spy();
    const render = mount(
      <Form onSubmit={onSubmit}>
        <TextInput name="username" value="nikolay" />
        <PasswordInput name="password" value="Ba(k0n!" />
      </Form>
    );
    render.find('form').simulate('submit');
    expect(onSubmit).to.have.been.calledWith({
      username: 'nikolay',
      password: 'Ba(k0n!'
    });
  });

  it('allows to access the form data', () => {
    const render = mount(
      <Form>
        <TextInput name="username" value="nikolay" />
        <PasswordInput name="password" value="Ba(k0n!" />
      </Form>
    );

    expect(render.nodes[0].value).to.eql({
      username: 'nikolay',
      password: 'Ba(k0n!'
    });
  });

  it('allows to set the form field values', () => {
    const render = mount(
      <Form>
        <TextInput name="username" />
        <PasswordInput name="password" />
      </Form>
    );

    render.nodes[0].value = {
      username: 'nikolay',
      password: 'Ba(k0n!'
    };

    expect(render.find(TextInput).nodes[0].value).to.eql('nikolay');
    expect(render.find(PasswordInput).nodes[0].value).to.eql('Ba(k0n!');
  });

  it('allows to set the form initial values', () => {
    const values = { username: 'nikolay', password: 'secret' };
    const render = mount(
      <Form defaultValue={values}>
        <TextInput name="username" />
        <PasswordInput name="password" />
      </Form>
    );

    expect(render.nodes[0].value).to.eql(values);

    render.find(PasswordInput).nodes[0].value = 'Ba(k0n!';

    expect(render.nodes[0].value).to.eql({
      username: 'nikolay',
      password: 'Ba(k0n!'
    });
  });
});
