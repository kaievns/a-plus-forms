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

describe.only('field', () => {
  describe('rendering options', () => {
    it('renders input with decorations', () => {
      const render = mount(<Input name="test" label="Some label" />);
      expect(render.html()).to.eql(
        '<div><label>Some label</label><div><input name="test" value=""></div></div>'
      );
    });

    it('allows to specify another layout', () => {
      const MyLayout = ({ label, input }: Object) =>
        <div className="field">
          <div className="label">{label}</div>
          <div className="input">{input}</div>
        </div>;

      const render = mount(<Input label="Some label" layout={MyLayout} />);
      expect(render.html()).to.eql(
        '<div class="field">' +
          '<div class="label">Some label</div>' +
          '<div class="input"><input value=""></div>' +
        '</div>'
      );
    });

    it('allows to disable a layout', () => {
      const render = mount(<Input layout={null} />);
      expect(render.html()).to.eql('<input value="">');

      const render2 = mount(<Input layout={false} />);
      expect(render2.html()).to.eql('<input value="">');
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
      const [field] = mount(<Input value="Nikolay" />);
      expect(field.value).to.eql('Nikolay');
    });

    it('tracks the value changes', () => {
      const onChange = spy();
      const render = mount(<Input onChange={onChange} />);
      render.find('input').simulate('change', { target: { value: 'new value' } });
      expect(onChange).to.have.been.calledWith('test: new value');
      expect(render.nodes[0].value).to.eql('test: new value');
    });

    it('allows to set a value on an instance', () => {
      const onChange = spy();
      const render = mount(<Input layout={null} onChange={onChange} />);
      const [field] = render;
      field.value = 'Nikolay';
      expect(field.value).to.eql('Nikolay');
      expect(onChange).to.have.been.calledWith('Nikolay');
      expect(render.html()).to.eql('<input value="Nikolay">');
    });
  });

  describe('compound fields', () => {
    @field()
    class CompoundInput extends React.Component {
      render() {
        return (
          <div>
            <TextInput name="username" />
            <PasswordInput name="password" />
          </div>
        );
      }
    }

    const render = mount(<CompoundInput />);
    const [input] = render.nodes;

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
