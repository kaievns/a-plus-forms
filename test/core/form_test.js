/* eslint no-unused-expressions: off */
import React from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { Form, Error as FormError, TextInput, PasswordInput, ValidatorProvider } from '../../src';

const sleep = ms => new Promise(r => setTimeout(r, ms));

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

  it('allows to submit the Form instance directly', () => {
    const onSubmit = spy();
    const render = mount(
      <Form onSubmit={onSubmit}>
        <TextInput name="username" value="nikolay" />
        <PasswordInput name="password" value="Ba(k0n!" />
      </Form>
    );

    render
      .find(Form)
      .instance()
      .submit();

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

  it('toplevel initial values have priority over lower ones', () => {
    const values = { username: 'nikolay', password: 'secret' };
    const render = mount(
      <Form defaultValue={values}>
        <TextInput name="username" defaultValue="droo" />
        <PasswordInput name="password" />
      </Form>
    );

    expect(render.at(0).instance().value).to.eql(values);
  });

  it('even if those values are falsy', () => {
    const values = { username: null, password: '' };
    const render = mount(
      <Form defaultValue={values}>
        <TextInput name="username" defaultValue="droo" />
        <PasswordInput name="password" />
      </Form>
    );

    expect(render.at(0).instance().value).to.eql(values);
  });

  it('allows to reset the form values back to the defaults', () => {
    const defaultValues = { username: 'nikolay', password: 'secret' };
    const render = mount(
      <Form defaultValue={defaultValues}>
        <TextInput name="username" />
        <PasswordInput name="password" />
      </Form>
    );

    render
      .find(PasswordInput)
      .at(0)
      .instance().value =
      'Ba(k0n!';

    render
      .find(Form)
      .instance()
      .reset();
    expect(render.find(Form).instance().value).to.eql(defaultValues);
  });

  it('tracks value changes via onChange', () => {
    const onChange = spy();
    const values = { username: 'old username', password: 'old password' };
    const render = mount(
      <Form defaultValue={values} onChange={onChange}>
        <TextInput name="username" />
        <PasswordInput name="password" />
      </Form>
    );

    expect(onChange.getCalls().map(c => c.args)).to.eql([]);

    render
      .find(TextInput)
      .at(0)
      .instance().value =
      'nikolay';

    render
      .find(PasswordInput)
      .at(0)
      .instance().value =
      'Ba(k0n!';

    expect(onChange.getCalls().map(c => c.args)).to.eql([
      [{ username: 'nikolay', password: 'old password' }],
      [{ username: 'nikolay', password: 'Ba(k0n!' }]
    ]);
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

    // doesn't render the errors right away
    expect(render.find(TextInput)).to.not.include.html('<small>must be present</small>');

    // renders the errors post-submit
    render.find('form').simulate('submit');
    expect(render.find(TextInput)).to.include.html('<small>must be present</small>');

    // hides the validation once the issue is resolved
    render
      .find(TextInput)
      .at(0)
      .instance().value =
      'nikolay';
    expect(render.find(TextInput)).to.not.include.html('<small>must be present</small>');
  });

  it('renders unclaimed errors in the form', () => {
    const validate = () => ({ username: 'must be present', everything: 'is terrible' });
    const render = mount(
      <Form schema={validate}>
        <TextInput name="username" />
        <PasswordInput name="password" />
      </Form>
    );

    render.find('form').simulate('submit');

    expect(render).to.have.html(
      '<form novalidate="">' +
        '<small class="error">everything is terrible</small>' +
        '<div>' +
        '<div><input type="text" name="username" value=""></div>' +
        '<small>must be present</small>' +
        '</div>' +
        '<div>' +
        '<div><input type="password" name="password" value=""></div>' +
        '</div>' +
        '</form>'
    );
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
          <TextInput name="username" defaultValue="not nikolay" />
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

  it('renders the server side caused errors like its own', async () => {
    const serverResponse = new FormError({ username: 'is terrible' });
    const onSubmit = () => Promise.reject(serverResponse);
    const onError = spy();

    const render = mount(
      <Form onError={onError} onSubmit={onSubmit}>
        <TextInput name="username" value="not nikolay" />
        <PasswordInput name="password" value="Ba(k0n!" />
      </Form>
    );

    render.find('form').simulate('submit');

    await sleep(50);

    expect(render.find(TextInput)).to.include.html('<small>is terrible</small>');
    expect(onError).to.have.been.calledWith({ username: 'is terrible' });
  });

  it('disables the form for the duration of the server request', async () => {
    const onSubmit = () => sleep(20);

    const render = mount(<Form onSubmit={onSubmit} />);

    // not disabled initially
    expect(render.find('form')).to.not.include.html(' disabled=""');

    render.find('form').simulate('submit');

    // disabled post submit
    expect(render.find('form')).to.include.html(' disabled=""');

    await sleep(50);

    // re-enabled after the response is received
    expect(render.find('form')).to.not.include.html(' disabled=""');
  });

  it('does not forget to re-enables form when things go seriously bad', async () => {
    const onSubmit = async () => {
      await sleep(20);
      throw new FormError({ username: 'is terrible' });
    };

    const render = mount(<Form onSubmit={onSubmit} />);

    expect(render.find('form')).to.not.include.html(' disabled=""');

    render.find('form').simulate('submit');

    expect(render.find('form')).to.include.html(' disabled=""');

    await sleep(50);

    expect(render.find('form')).to.not.include.html(' disabled=""');
  });

  it('updates the form value if the defaultValue changes', () => {
    const initalValues = { username: 'nikolay' };
    const render = mount(
      <Form defaultValue={initalValues}>
        <TextInput name="username" />
        <PasswordInput name="password" />
      </Form>
    );

    expect(render.find(TextInput).instance().value).to.eql('nikolay');

    render.setProps({ defaultValue: { username: 'antikolay' } });

    expect(render.find(TextInput).instance().value).to.eql('antikolay');
  });
});
