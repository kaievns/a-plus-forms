import React, { Fragment } from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { Select } from '../../src';

describe('<Select />', () => {
  const options = [{ label: 'One', value: 'one' }, { label: 'Two', value: 'two' }];

  it('renders correctly', () => {
    const render = mount(<Select layout={null} options={options} />);
    expect(render.html()).to.eql(
      '<select><option value="one">One</option><option value="two">Two</option></select>'
    );
  });

  it('doesnt explode without options', () => {
    const render = mount(<Select layout={null} />);
    expect(render.html()).to.eql('<select></select>');
  });

  it('allows plain string options too', () => {
    const onChange = spy();
    const options = ['one', 'two'];
    const render = mount(<Select layout={null} options={options} onChange={onChange} />);
    expect(render.html()).to.eql(
      '<select><option value="one">one</option><option value="two">two</option></select>'
    );
    render.find('select').simulate('change', {
      target: { value: 'two' }
    });

    expect(onChange).to.have.been.calledWith('two');
  });

  it('allows plain number options', () => {
    const onChange = spy();
    const options = [1, 2];
    const render = mount(<Select layout={null} options={options} onChange={onChange} />);
    expect(render.html()).to.eql(
      '<select><option value="v-0">1</option><option value="v-1">2</option></select>'
    );
    render.find('select').simulate('change', {
      target: { value: 'v-1' }
    });

    expect(onChange).to.have.been.calledWith(2);
  });

  it('allows named options', () => {
    const onChange = spy();
    const options = [{ id: 1, name: 'One' }, { id: 2, name: 'Two' }];
    const render = mount(<Select layout={null} options={options} onChange={onChange} />);
    expect(render.html()).to.eql(
      '<select><option value="v-0">One</option><option value="v-1">Two</option></select>'
    );
    render.find('select').simulate('change', {
      target: { value: 'v-1' }
    });

    expect(onChange).to.have.been.calledWith(options[1]);
  });

  it('allows jsx labels', () => {
    const options = [
      { label: <Fragment>cat</Fragment>, value: 'cat' },
      { label: <Fragment>dog</Fragment>, value: 'dog' }
    ];
    const render = mount(<Select layout={null} options={options} />);
    expect(render.html()).to.eql(
      '<select><option value="cat">cat</option><option value="dog">dog</option></select>'
    );
  });

  it('allows key -> value options', () => {
    const onChange = spy();
    const options = { x: 'Small', m: 'Medium', l: 'Large' };
    const render = mount(<Select layout={null} options={options} onChange={onChange} />);
    expect(render.html()).to.eql(
      '<select><option value="x">Small</option><option value="m">Medium</option><option value="l">Large</option></select>'
    );
    render.find('select').simulate('change', {
      target: { value: 'm' }
    });

    expect(onChange).to.have.been.calledWith('m');
  });

  it('supposrts the `multiple` prop and mutli-selects', () => {
    const onChange = spy();
    const options = { x: 'Small', m: 'Medium', l: 'Large' };
    const render = mount(<Select layout={null} options={options} onChange={onChange} multiple />);
    expect(render.html()).to.eql(
      '<select multiple=""><option value="x">Small</option><option value="m">Medium</option><option value="l">Large</option></select>'
    );

    // simulating a multi-select
    render
      .find('option')
      .at(1)
      .instance().selected = true;
    render
      .find('option')
      .at(2)
      .instance().selected = true;

    render.find('select').simulate('change');

    expect(onChange).to.have.been.calledWith(['m', 'l']);
  });

  it('sends back an empty array if a multi-select was changed to no options', () => {
    const onChange = spy();
    const options = { x: 'Small', m: 'Medium', l: 'Large' };
    const render = mount(<Select layout={null} options={options} onChange={onChange} multiple />);

    render.find('select').simulate('change');

    expect(onChange).to.have.been.calledWith([]);
  });

  it('understands the `name` prop', () => {
    const render = mount(<Select layout={null} name="size" />);
    expect(render.html()).to.eql('<select name="size"></select>');
  });

  it('understands the `placeholder` prop', () => {
    const render = mount(<Select layout={null} placeholder="Please..." />);
    expect(render.html()).to.eql('<select placeholder="Please..."></select>');
  });

  it('understands the `disabled` prop', () => {
    const render = mount(<Select layout={null} disabled />);
    expect(render.html()).to.eql('<select disabled=""></select>');
  });

  it('shows correct selected value', () => {
    const render = mount(<Select layout={null} options={options} value="one" />);
    expect(
      render
        .find('select')
        .at(0)
        .instance().value
    ).to.eql('one');
  });

  it('tracks change events', () => {
    const onChange = spy();
    const render = mount(<Select options={options} onChange={onChange} />);
    render.find('select').simulate('change', {
      target: { value: 'two' }
    });

    expect(onChange).to.have.been.calledWith('two');
  });
});
