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

  it('allows to provide a validation function', () => {
    const onError = spy();
    const onSubmit = spy();
    const validate = data => !data.username && { username: 'must be present' };
    const render = mount(
      <Form onSubmit={onSubmit} validate={validate} onError={onError}>
        <TextInput name="username" />
        <PasswordInput name="password" />
      </Form>
    );

    render.find('form').simulate('submit');

    expect(onError).to.have.been.calledWith({ username: 'must be present' });
    expect(onSubmit).to.not.have.been.called;
  });

  it('allows to pass validation with valid data', () => {
    const onError = spy();
    const onSubmit = spy();
    const validate = data => !data.username && { username: 'must be present' };
    const render = mount(
      <Form onSubmit={onSubmit} validate={validate} onError={onError}>
        <TextInput name="username" value="nikolay" />
        <PasswordInput name="password" value="Ba(k0n!" />
      </Form>
    );

    render.find('form').simulate('submit');

    expect(onError).to.not.have.been.called;
    expect(onSubmit).to.have.been.calledWith({
      username: 'nikolay',
      password: 'Ba(k0n!'
    });
  });

  it('allows to specify a JSON schema as a form schema', () => {
    const onError = spy();
    const onSubmit = spy();
    const schema = {
      properties: {
        username: { type: 'string', format: 'email' },
        password: { type: 'string' }
      },
      required: ['username', 'password']
    };
    const render = mount(
      <Form schema={schema} onSubmit={onSubmit} onError={onError}>
        <TextInput name="username" value="non-email" />
        <PasswordInput name="password" />
      </Form>
    );

    render.find('form').simulate('submit');

    expect(onSubmit).to.not.have.been.called;
    expect(onError).to.have.been.calledWith({
      username: 'must be a valid email',
      password: 'is required'
    });
  });

  it('allows to modify data before validation', () => {
    const onError = spy();
    const onSubmit = spy();
    const schema = {
      properties: {
        username: { type: 'string', format: 'email' },
        password: { type: 'string' }
      },
      required: ['username', 'password']
    };
    const preValidate = () => ({ username: 'nikolay@rocks.com', password: 'Ba(k0n!' });
    const render = mount(
      <Form schema={schema} onSubmit={onSubmit} onError={onError} preValidate={preValidate}>
        <TextInput name="username" value="non-email" />
        <PasswordInput name="password" />
      </Form>
    );

    render.find('form').simulate('submit');

    expect(onError).to.not.have.been.called;
    expect(onSubmit).to.have.been.calledWith({
      username: 'non-email',
      password: undefined
    });
  });

  it('allows pre and post submit hooks', () => {
    const preSubmit = data => ({ ...data, csrf: 'hackery' });
    const onSubmit = spy();
    const postSubmit = spy();

    const render = mount(
      <Form onSubmit={onSubmit} preSubmit={preSubmit} postSubmit={postSubmit}>
        <TextInput name="username" value="nikolay" />
        <PasswordInput name="password" value="Ba(k0n!" />
      </Form>
    );

    render.find('form').simulate('submit');

    expect(onSubmit).to.have.been.calledWith({
      username: 'nikolay',
      password: 'Ba(k0n!',
      csrf: 'hackery'
    });
  });
});
