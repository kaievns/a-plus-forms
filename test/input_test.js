import React from 'react';
import { mount } from 'enzyme';
import Input from '../src/input';

describe('<input />', () => {
  it('renders input with decorations', () => {
    const render = mount(<Input name="test" label="Some label" />);
    expect(render.html()).to.eql(
      '<div><label>Some label</label><div><input type="text" value=""></div></div>'
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
        '<div class="input"><input type="text" value=""></div>' +
      '</div>'
    );
  });

  it('allows to disable a layout', () => {
    const render = mount(<Input layout={null} />);
    expect(render.html()).to.eql('<input type="text" value="">');

    const render2 = mount(<Input layout={false} />);
    expect(render2.html()).to.eql('<input type="text" value="">');
  });
});
