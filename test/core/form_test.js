/* eslint no-unused-expressions: off */
import React from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { Form, TextInput, PasswordInput, ValidatorProvider } from '../../src';

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

    expect(render.at(0).instance().value).to.eql({
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

    render.at(0).instance().value = {
      username: 'nikolay',
      password: 'Ba(k0n!'
    };

    expect(
      render
        .find(TextInput)
        .at(0)
        .instance().value
    ).to.eql('nikolay');
    expect(
      render
        .find(PasswordInput)
        .at(0)
        .instance().value
    ).to.eql('Ba(k0n!');
  });

  it('allows to set the form initial values', () => {
    const values = { username: 'nikolay', password: 'secret' };
    const render = mount(
      <Form defaultValue={values}>
        <TextInput name="username" />
        <PasswordInput name="password" />
      </Form>
    );

    expect(render.at(0).instance().value).to.eql(values);

    render
      .find(PasswordInput)
      .at(0)
      .instance().value =
      'Ba(k0n!';

    expect(render.at(0).instance().value).to.eql({
      username: 'nikolay',
      password: 'Ba(k0n!'
    });
  });

  it('allows to provide a validation function', () => {
    const onError = spy();
    const onSubmit = spy();
    const validate = data => !data.username && { username: 'must be present' };
    const render = mount(
      <Form onSubmit={onSubmit} schema={validate} onError={onError}>
        <TextInput name="username" />
        <PasswordInput name="password" />
      </Form>
    );

    render.find('form').simulate('submit');

    expect(onError).to.have.been.calledWith({ username: 'must be present' });
    expect(onSubmit).to.not.have.been.called;
  });

  it('renders validation errors like a mofo', () => {
    const validate = data => !data.username && { username: 'must be present' };
    const render = mount(
      <Form schema={validate}>
        <TextInput name="username" />
        <PasswordInput name="password" />
      </Form>
    );

    render.find('form').simulate('submit');

    expect(render.find('Field').at(1)).to.include.html('<small>must be present</small>');
  });

  it('allows to pass validation with valid data', () => {
    const onError = spy();
    const onSubmit = spy();
    const validate = data => !data.username && { username: 'must be present' };
    const render = mount(
      <Form onSubmit={onSubmit} schema={validate} onError={onError}>
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

  it('allows to use custom validators', () => {
    const onError = spy();
    const onSubmit = spy();
    const schema = { some: 'schema' };

    let validatorInstance;
    let receivedData;

    class CustomValidator {
      constructor(schema) {
        this.schema = schema;
        validatorInstance = this;
      }

      /* eslint class-methods-use-this: off */
      errorsFor(data) {
        receivedData = data;

        if (data.username !== 'nikolay') {
          return { username: 'is terrible' };
        }

        return null;
      }
    }

    const render = mount(
      <ValidatorProvider validator={CustomValidator}>
        <Form schema={schema} onError={onError} onSubmit={onSubmit}>
          <TextInput name="username" value="not nikolay" />
          <PasswordInput name="password" value="Ba(k0n!" />
        </Form>
      </ValidatorProvider>
    );

    render.find('form').simulate('submit');

    expect(validatorInstance).to.be.instanceOf(CustomValidator);
    expect(validatorInstance.schema).to.equal(schema);
    expect(receivedData).to.eql({
      username: 'not nikolay',
      password: 'Ba(k0n!'
    });

    expect(onError).to.have.been.calledWith({
      username: 'is terrible'
    });
    expect(onSubmit).to.not.have.been.called;

    render
      .find(TextInput)
      .at(0)
      .instance().value =
      'nikolay';

    render.find('form').simulate('submit');

    expect(onSubmit).to.have.been.calledWith({
      username: 'nikolay',
      password: 'Ba(k0n!'
    });
  });

  it('supports async validators', async () => {
    const onError = spy();
    const onSubmit = spy();
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    class AsyncValidator {
      async errorsFor({ username }) {
        await sleep(100);

        return username === 'nikolay' ? null : { username: 'is terrible' };
      }
    }

    const render = mount(
      <ValidatorProvider validator={AsyncValidator}>
        <Form onError={onError} onSubmit={onSubmit}>
          <TextInput name="username" value="not nikolay" />
          <PasswordInput name="password" value="Ba(k0n!" />
        </Form>
      </ValidatorProvider>
    );

    render.find('form').simulate('submit');

    await sleep(500);

    expect(onError).to.have.been.calledWith({ username: 'is terrible' });
    expect(onSubmit).to.not.have.been.called;
  });
});
