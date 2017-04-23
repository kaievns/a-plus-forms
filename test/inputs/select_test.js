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
