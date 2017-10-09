import React from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { field, TextInput, PasswordInput } from '../../src';

@field()
class Input extends React.Component {
  props: {
    value?: string,
    onChange: Function
  }

  render() {
    const { onChange, value = '', ...rest } = this.props;
    return <input {...rest} value={value} onChange={e => onChange(`test: ${e.target.value}`)} />;
  }
}

@field({ nested: true })
class NestedInput extends React.Component {
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
      expect(render.html()).to.eql(
        '<div><div><input id="my-input" value=""></div></div>'
      );
    });

    it('renders #className param', () => {
      const render = mount(<Input className="my-class" />);
      expect(render.html()).to.eql(
        '<div><div><input class="my-class" value=""></div></div>'
      );
    });

    it('renders #placeholder param', () => {
      const render = mount(<Input placeholder="My Value" />);
      expect(render.html()).to.eql(
        '<div><div><input placeholder="My Value" value=""></div></div>'
      );
    });

    it('renders #disabled param', () => {
      const render = mount(<Input disabled />);
      expect(render.html()).to.eql(
        '<div><div><input disabled="" value=""></div></div>'
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
      const field = mount(<Input value="Nikolay" />).at(0).instance();
      expect(field.value).to.eql('Nikolay');
    });

    it('tracks the value changes', () => {
      const onChange = spy();
      const render = mount(<Input onChange={onChange} />);
      render.find('input').simulate('change', { target: { value: 'new value' } });
      expect(onChange).to.have.been.calledWith('test: new value');
      expect(render.at(0).instance().value).to.eql('test: new value');
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
  });
});
