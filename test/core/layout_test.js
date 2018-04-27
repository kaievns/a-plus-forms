import React from 'react';
import { mount } from 'enzyme';
import { field, TextInput, LayoutProvider } from '../../src';
import type { InputProps, Element } from '../../src/types';

class Layout1 extends React.Component {
  props: {
    className: string,
    input: Element
  };

  render() {
    return (
      <div className={this.props.className}>
        <s>Layout1</s>
        {this.props.input}
      </div>
    );
  }
}

class Layout2 extends React.Component {
  props: {
    input: Element
  };

  render() {
    return (
      <div>
        <s>Layout2</s>
        {this.props.input}
      </div>
    );
  }
}

@field({ layout: Layout1 })
class Input extends React.Component {
  props: InputProps;

  render() {
    const { value = '', ...rest } = this.props;
    return <input value={value} {...rest} />;
  }
}

describe('layouts handling', () => {
  it('allows to specify another layout', () => {
    const render = mount(<Input label="Some label" layout={Layout2} />);
    expect(render.html()).to.eql('<div><s>Layout2</s><input value=""></div>');
  });

  it('applies className to the layout', () => {
    const render = mount(<Input className="some-class" />);
    expect(render.html()).to.eql('<div class="some-class"><s>Layout1</s><input value=""></div>');
  });

  it('allows to disable a layout', () => {
    const render = mount(<Input layout={null} />);
    expect(render.html()).to.eql('<input value="">');

    const render2 = mount(<Input layout={false} />);
    expect(render2.html()).to.eql('<input value="">');
  });

  it('still shows errors if the layout is disabled', () => {
    const render = mount(<Input layout={null} error="everything is terrible" />);

    expect(render).to.have.descendants('small.error');
  });

  it('passes layout props to null layout', () => {
    const render = mount(<Input className="some-class" layout={null} />);

    expect(render)
      .to.have.exactly(1)
      .descendants('NullLayout');

    expect(render.find('NullLayout')).to.include.props({ className: 'some-class' });
  });

  it('renders the options layout as the next in kin', () => {
    const render = mount(<Input />);
    expect(render.html()).to.eql('<div><s>Layout1</s><input value=""></div>');
  });

  it('allows to specify a layout via a layout provider', () => {
    const render = mount(
      <LayoutProvider layout={Layout2}>
        <TextInput />
      </LayoutProvider>
    );

    expect(render.html()).to.eql('<div><s>Layout2</s><input type="text" value=""></div>');
  });

  it('falls back to the default layout if no layout value provided', () => {
    const render = mount(<TextInput label="Some label" />);
    expect(render)
      .to.have.exactly(1)
      .descendants('DefaultLayout');
    expect(render.html()).to.eql(
      '<div><label>Some label</label><div><input type="text" value=""></div></div>'
    );
  });
});
