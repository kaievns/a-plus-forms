import React from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { Radios } from '../../src';

describe('<Radios />', () => {
  const options = [{ label: 'One', value: 'one' }, { label: 'Two', value: 'two' }];

  it('renders correctly', () => {
    const render = mount(<Radios layout={null} options={options} />);
    expect(render.html()).to.eql(
      '<div>' +
        '<label><input type="radio" value="one"><span>One</span></label>' +
        '<label><input type="radio" value="two"><span>Two</span></label>' +
        '</div>'
    );
  });

  it('understands the `name` prop', () => {
    const render = mount(<Radios layout={null} options={options} name="size" />);
    expect(render.html()).to.eql(
      '<div>' +
        '<label><input type="radio" name="size" value="one"><span>One</span></label>' +
        '<label><input type="radio" name="size" value="two"><span>Two</span></label>' +
        '</div>'
    );
  });

  it('doesnt explode without options', () => {
    const render = mount(<Radios layout={null} />);
    expect(render.html()).to.eql('<div></div>');
  });

  it('allows plain string options too', () => {
    const onChange = spy();
    const options = ['one', 'two'];
    const render = mount(<Radios layout={null} options={options} onChange={onChange} />);
    expect(render.html()).to.eql(
      '<div>' +
        '<label><input type="radio" value="one"><span>one</span></label>' +
        '<label><input type="radio" value="two"><span>two</span></label>' +
        '</div>'
    );
    render
      .find('input[type="radio"]')
      .at(1)
      .simulate('change');

    expect(onChange).to.have.been.calledWith('two');
  });

  it('allows plain number options', () => {
    const onChange = spy();
    const options = [1, 2];
    const render = mount(<Radios layout={null} options={options} onChange={onChange} />);
    expect(render.html()).to.eql(
      '<div>' +
        '<label><input type="radio" value="v-0"><span>1</span></label>' +
        '<label><input type="radio" value="v-1"><span>2</span></label>' +
        '</div>'
    );
    render
      .find('input[type="radio"]')
      .at(1)
      .simulate('change');

    expect(onChange).to.have.been.calledWith(2);
  });

  it('allows named options', () => {
    const onChange = spy();
    const options = [{ id: 1, name: 'One' }, { id: 2, name: 'Two' }];
    const render = mount(<Radios layout={null} options={options} onChange={onChange} />);
    expect(render.html()).to.eql(
      '<div>' +
        '<label><input type="radio" value="v-0"><span>One</span></label>' +
        '<label><input type="radio" value="v-1"><span>Two</span></label>' +
        '</div>'
    );
    render
      .find('input[type="radio"]')
      .at(1)
      .simulate('change');

    expect(onChange).to.have.been.calledWith(options[1]);
  });

  it('shows correct selected value', () => {
    const render = mount(<Radios layout={null} options={options} value="one" />);
    expect(
      render
        .find('input[type="radio"]')
        .at(0)
        .props()
    ).to.include({ checked: true });
  });

  it('tracks change events', () => {
    const onChange = spy();
    const render = mount(<Radios options={options} onChange={onChange} />);
    render
      .find('input[type="radio"]')
      .at(0)
      .simulate('change');

    expect(onChange).to.have.been.calledWith('one');
  });
});
