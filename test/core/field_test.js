import React from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { field, TextInput, PasswordInput } from '../../src';
import type { InputProps } from '../../src/types';

@field()
class Input extends React.Component {
  props: InputProps;

  render() {
    const { onChange, value = '', ...rest } = this.props;
    return <input {...rest} value={value} onChange={e => onChange(`test: ${e.target.value}`)} />;
  }
}

@field({ nested: true })
class NestedInput extends React.Component {
  props: InputProps;

  render() {
    return (
      <div>
        <TextInput name="username" />
        <PasswordInput name="password" />
      </div>
    );
  }
}

describe('field', () => {
  describe('rendering options', () => {
    it('renders input with decorations', () => {
      const render = mount(<Input name="test" label="Some label" />);
      expect(render.html()).to.eql(
        '<div><label>Some label</label><div><input name="test" value=""></div></div>'
      );
    });

    it('renders the #id prop', () => {
      const render = mount(<Input id="my-input" />);
      expect(render.html()).to.eql('<div><div><input id="my-input" value=""></div></div>');
    });

    it('renders #className param', () => {
      const render = mount(<Input className="my-class" />);
      expect(render.html()).to.eql('<div><div><input class="my-class" value=""></div></div>');
    });

    it('renders #placeholder param', () => {
      const render = mount(<Input placeholder="My Value" />);
      expect(render.html()).to.eql('<div><div><input placeholder="My Value" value=""></div></div>');
    });

    it('renders #disabled param', () => {
      const render = mount(<Input disabled />);
      expect(render.html()).to.eql('<div><div><input disabled="" value=""></div></div>');
    });

    it('renders the #error param', () => {
      const render = mount(<Input error="everything is terrible" />);
      expect(render.html()).to.eql(
        '<div><div><input value=""></div><small>everything is terrible</small></div>'
      );
    });

    it('does not render the errors if the state is explicitly not dirty', () => {
      const render = mount(<Input error="everything is terrible" dirty={false} />);
      expect(render.html()).to.eql('<div><div><input value=""></div></div>');
    });

    it('renders the errors if the state is explicitly dirty', () => {
      const render = mount(<Input error="everything is terrible" dirty />);
      expect(render.html()).to.eql(
        '<div><div><input value=""></div><small>everything is terrible</small></div>'
      );
    });

    it('renders nested errors if there is no one to pick them up', () => {
      const error = { life: 'is terrible', sun: 'is annoying', capitalism: 'sucks' };
      const render = mount(<Input error={error} />);
      expect(render.html()).to.eql(
        '<div><div><input value=""></div><small>' +
          'life is terrible, sun is annoying, and capitalism sucks' +
          '</small></div>'
      );
    });
  });

  describe('data flow', () => {
    it('allows to set the current value of the field', () => {
      const render = mount(<Input layout={null} value="Nikolay" />);
      expect(render.html()).to.eql('<input value="Nikolay">');
    });

    it('allows to specify `defaultValue` prop', () => {
      const render = mount(<Input layout={null} defaultValue="Nikolay" />);
      expect(render.html()).to.eql('<input value="Nikolay">');
    });

    it('allows to access the current value of the field', () => {
      const field = mount(<Input value="Nikolay" />)
        .at(0)
        .instance();
      expect(field.value).to.eql('Nikolay');
    });

    it('tracks changes in the `value` prop', () => {
      const field = mount(<Input value="Nikolay" layout={null} />);
      field.setProps({ value: 'new value' });
      expect(field.html()).to.eql('<input value="new value">');
    });

    it('tracks the value changes', () => {
      const onChange = spy();
      const render = mount(<Input onChange={onChange} layout={null} />);
      render.find('input').simulate('change', { target: { value: 'new value' } });
      expect(onChange.getCalls().map(c => c.args)).to.eql([['test: new value']]);
      expect(render.at(0).instance().value).to.eql('test: new value');
      expect(render.html()).to.eql('<input value="test: new value">');
    });

    it('does not trigger change if the value is changed to the same thing', () => {
      const onChange = spy();
      const render = mount(<Input onChange={onChange} defaultValue="nikolay" />);
      render.setProps({ value: 'nikolay' });
      expect(onChange.getCalls().map(c => c.args)).to.eql([]);
    });

    it('allows to set a value on an instance', () => {
      const onChange = spy();
      const render = mount(<Input layout={null} onChange={onChange} />);
      const field = render.at(0).instance();
      field.value = 'Nikolay';
      expect(field.value).to.eql('Nikolay');
      expect(onChange).to.have.been.calledWith('Nikolay');
      expect(render.html()).to.eql('<input value="Nikolay">');
    });
  });

  describe('nested fields', () => {
    const render = mount(<NestedInput />);
    const input = render.at(0).instance();

    it('renders correctly', () => {
      const render = mount(<NestedInput label="Login creds" />);

      expect(render.html()).to.eql(
        '<div>' +
          '<label>Login creds</label>' +
          '<div>' +
          '<div>' +
          '<div>' +
          '<div><input type="text" name="username" value=""></div>' +
          '</div>' +
          '<div>' +
          '<div><input type="password" name="password" value=""></div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>'
      );
    });

    it('has empty values by default', () => {
      expect(input.value).to.eql({
        username: undefined,
        password: undefined
      });
    });

    it('picks up changes in the sub-fields', () => {
      render.find('input[name="username"]').simulate('change', {
        target: { value: 'nikolay' }
      });

      expect(input.value).to.eql({
        username: 'nikolay',
        password: undefined
      });

      render.find('input[name="password"]').simulate('change', {
        target: { value: 'Ba(k0n!' }
      });

      expect(input.value).to.eql({
        username: 'nikolay',
        password: 'Ba(k0n!'
      });
    });

    it('triggers onChange in for changes in the sub-fields', () => {
      const onChange = spy();
      const render = mount(<NestedInput onChange={onChange} />);

      render.find('input[name="username"]').simulate('change', {
        target: { value: 'nikolay' }
      });

      expect(onChange.getCalls().map(c => c.args)).to.eql([
        [
          {
            username: 'nikolay',
            password: undefined
          }
        ]
      ]);
    });

    it('propagates changes in the `value` prop', () => {
      const onChange = spy();
      const render = mount(<NestedInput onChange={onChange} layout={null} />);
      render.setProps({
        value: {
          username: 'new username',
          password: 'new password'
        }
      });

      expect(onChange.getCalls().map(c => c.args)).to.eql([
        [
          {
            username: 'new username',
            password: 'new password'
          }
        ]
      ]);

      expect(render.find(TextInput).html()).to.eql(
        '<div><div><input type="text" name="username" value="new username"></div></div>'
      );
    });

    it('sends errors to sub-fields', () => {
      const error = { username: 'is terrible', password: 'is weak' };
      const render = mount(<NestedInput error={error} />);

      expect(render.html()).to.eql(
        '<div><div><div>' +
          '<div>' +
          '<div><input type="text" name="username" value=""></div>' +
          '<small>is terrible</small>' +
          '</div>' +
          '<div>' +
          '<div><input type="password" name="password" value=""></div>' +
          '<small>is weak</small>' +
          '</div>' +
          '</div></div></div>'
      );
    });

    it('renders string errors in itself', () => {
      const error = 'everything is terrible';
      const render = mount(<NestedInput error={error} />);

      expect(render.html()).to.eql(
        '<div><div><div>' +
          '<div><div><input type="text" name="username" value=""></div></div>' +
          '<div><div><input type="password" name="password" value=""></div></div>' +
          '</div></div>' +
          '<small>everything is terrible</small>' +
          '</div>'
      );
    });

    it('picks up unsed errors', () => {
      const error = { '': 'everything is terrible', username: 'is terrible', capitalism: 'sucks' };
      const render = mount(<NestedInput error={error} />);

      expect(render.html()).to.eql(
        '<div><div><div>' +
          '<div>' +
          '<div><input type="text" name="username" value=""></div>' +
          '<small>is terrible</small>' +
          '</div>' +
          '<div>' +
          '<div><input type="password" name="password" value=""></div>' +
          '</div>' +
          '</div></div>' +
          '<small>everything is terrible, and capitalism sucks</small>' +
          '</div>'
      );
    });

    it('does not render errors if the field was made explicitly not dirty', () => {
      const error = { '': 'everything is terrible', username: 'is terrible', password: 'is weak' };
      const render = mount(<NestedInput error={error} dirty={false} />);

      expect(render.html()).to.eql(
        '<div><div><div>' +
          '<div>' +
          '<div><input type="text" name="username" value=""></div>' +
          '</div>' +
          '<div>' +
          '<div><input type="password" name="password" value=""></div>' +
          '</div>' +
          '</div></div>' +
          '</div>'
      );
    });
  });
});
