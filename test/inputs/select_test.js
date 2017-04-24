import React from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { Select } from '../../src';

describe('<Select />', () => {
  const options = [
    { label: 'One', value: 'one' },
    { label: 'Two', value: 'two' }
  ];

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
    expect(render.find('select').nodes[0].value).to.eql('one');
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
