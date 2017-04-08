import React from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import field from '../src/field';

@field()
class Input extends React.Component {
  render() {
    const { onChange, ...rest } = this.props;
    return <input {...rest} onChange={e => onChange(`test: ${e.target.value}`)} />;
  }
}

describe('<input />', () => {
  it('renders input with decorations', () => {
    const render = mount(<Input name="test" label="Some label" />);
    expect(render.html()).to.eql(
      '<div><label>Some label</label><div><input value=""></div></div>'
    );
  });

  it('allows to specify another layout', () => {
    const MyLayout = ({ label, input }) =>
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

  it('allows to set the current value of the field', () => {
    const render = mount(<Input layout={null} value="Nikolay" />);
    expect(render.html()).to.eql('<input value="Nikolay">');
  });

  it('allows to access the current value of the field', () => {
    const render = mount(<Input layout={null} value="Nikolay" />);
    const [field] = render;
    expect(field.value).to.eql("Nikolay");
  });

  it('tracks the value changes', () => {
    const onChange = spy();
    const render = mount(<Input onChange={onChange} />);
    render.find('input').simulate('change', { target: { value: 'new value' } });
    expect(onChange).to.have.been.calledWith('test: new value');
    const [field] = render;
    expect(field.value).to.eql('test: new value');
  });
});
