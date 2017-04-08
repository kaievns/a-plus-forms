import React from 'react';
import { mount } from 'enzyme';
import field from '../src/field';

@field()
class Input extends React.Component {
  render() {
    return <input {...this.props} />
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
});
